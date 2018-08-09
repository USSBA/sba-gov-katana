#!/bin/bash
ENVIRONMENT=$1
BUCKET_NAME=sbagovlower-lambda-source-temp

case $ENVIRONMENT in
  production)
    export ASSET_BUCKET_NAME_PREFIX=production.sba.gov
    ;;
  staging)
    export ASSET_BUCKET_NAME_PREFIX=staging.sba.gov
    ;;
  mint)
    export ASSET_BUCKET_NAME_PREFIX=mint.ussba.io
    ;;
  demo)
    export ASSET_BUCKET_NAME_PREFIX=demo.ussba.io
    ;;
  int-as)
    export ASSET_BUCKET_NAME_PREFIX=avery.ussba.io
    ;;
  int-bl)
    export ASSET_BUCKET_NAME_PREFIX=brian.ussba.io
    ;;
  int-kl)
    export ASSET_BUCKET_NAME_PREFIX=kevin.ussba.io
    ;;
  int-ls)
    export ASSET_BUCKET_NAME_PREFIX=laura.ussba.io
    ;;
  int-rh)
    export ASSET_BUCKET_NAME_PREFIX=ryan.ussba.io
    ;;
  *)
    export ASSET_BUCKET_NAME_PREFIX=${ENVIRONMENT}
    ;;
esac




export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-us-east-1}
export AWS_DEFAULT_OUTPUT=${AWS_DEFAULT_OUTPUT:-json}

export VERSION_ID=$(aws s3api list-object-versions --bucket ${BUCKET_NAME} --prefix "${ENVIRONMENT}/katana-lambda.zip" | jq '.Versions[0].VersionId')
export LAMBDA_NAME="${ENVIRONMENT}-KatanaLambda"

aws lambda update-function-code --function-name "${LAMBDA_NAME}" --s3-bucket "${BUCKET_NAME}" --s3-key "${ENVIRONMENT}/katana-lambda.zip" --s3-object-version "${VERSION_ID}"
aws s3 sync public/build/ s3://${ASSET_BUCKET_NAME_PREFIX}-assets/build/