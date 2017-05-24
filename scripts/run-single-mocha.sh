#!/bin/bash
./node_modules/.bin/mocha --compilers js:babel-core/register  --require ./test/mocha/helpers/globals.js test/mocha/$1
