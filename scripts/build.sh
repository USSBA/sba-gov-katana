#!/bin/bash
rm -rf public/build
rm -rf dist
NODE_ENV=production $(npm bin)/babel src -d dist --ignore client/*
NODE_ENV=production $(npm bin)/webpack --config webpack.config.production.js --progress --profile --colors
