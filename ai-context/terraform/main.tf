provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.14.2"
  name = "backstage-vpc"
  cidr = "10.0.0.0/16"
  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]
  enable_nat_gateway = true
  single_nat_gateway = true
  tags = { Name = "backstage-vpc" }
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "20.2.1"
  cluster_name    = "backstage-cluster"
  cluster_version = "1.27"
  subnets         = module.vpc.private_subnets
  vpc_id          = module.vpc.vpc_id
  enable_irsa     = true

  eks_managed_node_group_defaults = {
    instance_types = ["t3.medium"]
  }

  eks_managed_node_groups = {
    default = {
      desired_capacity = 2
      max_capacity     = 3
      min_capacity     = 1
    }
  }

  tags = { Name = "backstage-cluster" }
}

resource "aws_s3_bucket" "techdocs" {
  bucket = "backstage-techdocs-bucket"
  force_destroy = true

  tags = {
    Name = "BackstageTechDocs"
  }
}

resource "aws_db_instance" "backstage_postgres" {
  identifier         = "backstage-db"
  engine             = "postgres"
  instance_class     = "db.t3.micro"
  allocated_storage  = 20
  name               = "backstagedb"
  username           = "admin"
  password           = "Admin1234!" # Replace with Secrets Manager in production
  skip_final_snapshot = true
  publicly_accessible = false
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  db_subnet_group_name   = aws_db_subnet_group.default.name

  tags = {
    Name = "BackstagePostgres"
  }
}

resource "aws_db_subnet_group" "default" {
  name       = "backstage-db-subnet-group"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Name = "BackstageDBSubnetGroup"
  }
}