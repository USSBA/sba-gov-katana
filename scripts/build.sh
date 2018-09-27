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

    MAIN_JAVASCRIPT_FILE=$(find public/build -regextype posix-extended -regex '^public/build/[a-f0-9]{20}\.bundle\.js' | cut -d/ -f3)
    echo ${MAIN_JAVASCRIPT_FILE} > public/build/main.txt
fi



