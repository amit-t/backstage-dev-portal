# Backstage AWS Terraform Setup

## What it creates:
- VPC with public and private subnets
- EKS cluster (Kubernetes) for Backstage deployment
- S3 bucket for TechDocs
- PostgreSQL RDS instance for Backstage database

## How to use:

1. Install Terraform:
```bash
brew install terraform
```

2. Initialize and apply:
```bash
terraform init
terraform apply -auto-approve
```

3. Save output values for app config:
- EKS cluster name
- S3 bucket name
- RDS endpoint