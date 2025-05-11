output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.techdocs.bucket
}

output "rds_endpoint" {
  value = aws_db_instance.backstage_postgres.endpoint
}