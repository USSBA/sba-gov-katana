#!/bin/bash
eslint src
rm -rf dist
$(npm bin)/babel src -d dist --ignore client/*
$(npm bin)/webpack --config webpack.config.production.js --progress --profile --colors
docker build -t sba-gov-katana .
