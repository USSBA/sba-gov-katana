#!/bin/bash
docker build -t sba-gov-katana .
docker tag sba-gov-katana:latest 536656293683.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana:$1
docker push 536656293683.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana:$1
