FROM docker:stable-git

RUN apk add --no-cache py-pip jq curl bash
RUN pip install awscli==1.14.12 docker-compose==1.16.1
RUN curl -o /usr/bin/ecs-deploy https://raw.githubusercontent.com/silinternational/ecs-deploy/master/ecs-deploy && chmod 555 /usr/bin/ecs-deploy
