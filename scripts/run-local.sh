#!/bin/bash
docker run --rm  -v /Users/jon/Documents/Projects/sba/sba-gov-node/config:/usr/src/app/config/ --name katana -p 65097:3000 -e NODE_ENV=production 536656293683.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana
