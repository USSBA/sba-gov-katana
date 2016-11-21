#!/bin/bash
eslint src
rm -rf dist
babel src -d dist --ignore client/*
webpack --config webpack.config.production.js --progress --profile --colors
docker build -t sba-gov-katana .