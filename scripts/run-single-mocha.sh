#!/bin/bash
NODE_ENV=test ./node_modules/.bin/mocha --compilers js:@babel/register  --require ./test/mocha/helpers/globals.js test/mocha/$1
