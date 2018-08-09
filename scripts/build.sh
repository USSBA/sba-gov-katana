#!/bin/bash -e

echo "Building Server Code"
rm -rf dist
NODE_ENV=production $(npm bin)/babel src -d dist --ignore client/* --no-babelrc --env='{ env: { production: { targets: { node: "current" , "uglify" : "true"} } } }'  --plugins transform-object-rest-spread,transform-es2015-modules-commonjs
echo "Server Build Complete"

if [ "$1" == "all" ]
then 
    echo "Building Webpack"
    rm -rf public/build
    NODE_ENV=production $(npm bin)/webpack --config webpack.config.production.js
    echo "Webpack Build Complete"
fi



