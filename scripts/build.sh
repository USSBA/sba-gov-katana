#!/bin/bash
eslint src
webpack --config webpack.config.production.js --progress --profile --colors
docker build -t sba-gov-katana .