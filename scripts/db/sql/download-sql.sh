#!/bin/bash
cd `dirname $0`
aws s3 ls s3://sbagov.fearlesstesters.com/data/ > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "AWS Credentials are configured properly.  Downloading sql config if necessary..."
  aws s3 sync s3://sbagov.fearlesstesters.com/data/ .
  echo "Done!"
else
  echo "ERROR: It appears you do not have AWS credentials configured properly."
  echo '  Ensure `aws s3 ls s3://sbagov.fearlesstesters.com/data/` works before proceeding'
fi
