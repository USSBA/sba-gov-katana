#!/bin/bash -e
rm -rf public/build
rm -rf dist
NODE_ENV=production $(npm bin)/babel src -d dist --ignore client/* --no-babelrc --env='{ env: { production: { targets: { node: "current" , "uglify" : "true"} } } }'  --plugins transform-object-rest-spread,transform-es2015-modules-commonjs
# NODE_ENV=production $(npm bin)/webpack --config webpack.config.production.js
