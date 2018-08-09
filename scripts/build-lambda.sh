#!/bin/bash
mkdir temp
mkdir -p temp/public/build/
mkdir -p temp/config
mkdir -p temp/views
mkdir workspace
cp package.json temp/
cp -R dist/* temp/
cp -R public/build/* temp/public/build/
cp -R config/* temp/config/
cp -R src/views/* temp/views/
cd temp
find . -name '*.test.js' -delete
find . -name '*.integration-test.js' -delete
npm i --prod --silent
rm package.json
zip -r -q ../workspace/katana-lambda.zip .
cd ..
rm -rf temp

aws s3api put-object --body "workspace/katana-lambda.zip" --bucket "sbagovlower-lambda-source-temp" --key "$1/katana-lambda.zip"
rm -rf workspace

