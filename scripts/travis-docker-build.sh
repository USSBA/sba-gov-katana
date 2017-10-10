#!/bin/bash
if [ $TRAVIS_PULL_REQUEST == "false" ]; then
    ./scripts/build.sh
    docker --version  # document the version travis is using
    pip install --user awscli # install aws cli w/o sudo
    export PATH=$PATH:$HOME/.local/bin # put aws in the path
    eval $(aws ecr get-login --region us-east-1) #needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY envvars
    docker build -t katana .
    docker tag katana:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana:latest
    docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana:latest
    docker tag katana:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana:${TRAVIS_BUILD_NUMBER}
    docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana:${TRAVIS_BUILD_NUMBER}
    if [ ${TRAVIS_BRANCH} != "master" ]; then
        docker tag katana:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana:${TRAVIS_BRANCH}
        docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/sba-gov-katana:${TRAVIS_BRANCH}
    fi
fi
