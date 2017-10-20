#!/bin/bash
aws s3 ls s3://sbagov.fearlesstesters.com/data/ > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "AWS Credentials are configured properly.  Downloading sql config if necessary..."
  aws s3 sync --exclude "*" --include "sba_katana.sql" s3://sbagov.fearlesstesters.com/data/ .
  cat ./katana_init.sql ./sba_katana.sql > ./katana_sql/katana_create.sql
  echo "Done!"
else
  echo "ERROR: It appears you do not have AWS credentials configured properly."
  echo '  Ensure `aws s3 ls s3://sbagov.fearlesstesters.com/data/` works before proceeding'
fi
