# Phase 5: Secrets Manager, GitHub Actions, Helm Deployment

## Objective
Automate secret management using AWS Secrets Manager, enable GitHub Actions for Terraform, and deploy Backstage via Helm to EKS.

---

## Part 1: Integrate AWS Secrets Manager

### Step 1: Store Backstage secrets in AWS Secrets Manager
Create secrets using AWS CLI or Terraform:

```bash
aws secretsmanager create-secret --name backstage/github-client-id --secret-string "your-client-id"
aws secretsmanager create-secret --name backstage/github-client-secret --secret-string "your-client-secret"
```

### Step 2: Update Terraform to create secrets

Add to `main.tf`:

```hcl
resource "aws_secretsmanager_secret" "github_client_id" {
  name = "backstage/github-client-id"
}

resource "aws_secretsmanager_secret_version" "github_client_id_value" {
  secret_id     = aws_secretsmanager_secret.github_client_id.id
  secret_string = "your-client-id"
}
```

Repeat for `github-client-secret`.

### Step 3: Allow EKS Backstage pod to access secrets
Use IAM Roles for Service Accounts (IRSA) and annotate the Kubernetes service account with IAM permissions.

```hcl
module "irsa_backstage" {
  source = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  role_name_prefix = "backstage-irsa"
  attach_secretsmanager_read_only_policy = true
  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["default:backstage"]
    }
  }
}
```

---

## Part 2: GitHub Actions for Terraform

### Step 1: Add GitHub Actions Workflow `.github/workflows/terraform.yml`

```yaml
name: Terraform Apply

on:
  push:
    branches:
      - main

jobs:
  terraform:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: 1.5.7

      - name: Terraform Init
        run: terraform init

      - name: Terraform Plan
        run: terraform plan

      - name: Terraform Apply
        env:
          TF_VAR_region: us-east-1
        run: terraform apply -auto-approve
```

---

## Part 3: Helm Chart Deployment of Backstage

### Step 1: Add Helm repo and install Backstage
Create a new script `deploy_backstage.sh`:

```bash
#!/bin/bash

helm repo add backstage https://backstage.github.io/charts
helm repo update

helm upgrade --install backstage backstage/backstage   --namespace backstage --create-namespace   -f backstage-values.yaml
```

### Step 2: Prepare `backstage-values.yaml`

```yaml
app:
  baseUrl: https://backstage.internal.example.com
  title: "Internal Developer Portal"

ingress:
  enabled: true
  host: backstage.internal.example.com
  annotations:
    kubernetes.io/ingress.class: alb

postgresql:
  enabled: false

externalPostgresql:
  host: <rds-endpoint>
  user: admin
  password: your_password
  database: backstagedb

secrets:
  githubClientId: <read-from-secrets-manager>
  githubClientSecret: <read-from-secrets-manager>
```

You can use Kubernetes external secrets or initContainers to inject secrets from AWS Secrets Manager.

---

## Final Outputs
✅ Secrets stored and securely managed  
✅ GitHub Actions automatically applies Terraform on push  
✅ Backstage Helm deployment on EKS with external RDS and S3