#!/bin/bash
docker build -t katana . && \
docker tag katana:latest 248615503339.dkr.ecr.us-east-1.amazonaws.com/katana:$1 && \
docker push 248615503339.dkr.ecr.us-east-1.amazonaws.com/katana:$1
