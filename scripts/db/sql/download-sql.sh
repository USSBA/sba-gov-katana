#!/bin/bash
cd `dirname $0`
aws s3 ls s3://sbagov.fearlesstesters.com/data/ > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "AWS Credentials are configured properly.  Downloading sql config..."
  aws s3 cp s3://sbagov.fearlesstesters.com/data/sba_drupal8.sql .
  aws s3 cp s3://sbagov.fearlesstesters.com/data/sba_drupal.sql .
  aws s3 cp s3://sbagov.fearlesstesters.com/data/sba_katana.sql .
else
  echo "ERROR: It appears you do not have AWS credentials configured properly."
  echo '  Ensure `aws s3 ls s3://sbagov.fearlesstesters.com/data/` works before proceeding'
fi
