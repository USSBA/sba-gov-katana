#!/bin/bash
stat ./dist -t
stat ./public/build -t

rm -rf workspace
rm -rf temp

# Copy the assets and built javascript into the workspace
echo "Creating Workspace"
mkdir workspace
mkdir -p workspace/build/
echo "Copying assets and webpack build results into workspace"
cp -R public/* workspace/

# Build the Lambda Package
echo "Building the Lambda Package"
echo "Coping important files"
mkdir temp
mkdir -p temp/public/build/
mkdir -p temp/config
mkdir -p temp/views
cp -R config/* temp/config/
cp -R src/views/* temp/views/
cp -R dist/* temp/
cp -R public/* temp/public/
cp public/build/main.txt temp/public/build/main.txt
cp package.json temp/
cd temp
echo "Deleting Test files"
find . -name '*.test.js' -delete
find . -name '*.integration-test.js' -delete
echo "Installing dependencies"
npm i --production --silent
rm package.json
zip -r -q ../workspace/katana-lambda.zip .
cd ..
echo "Complete!"
