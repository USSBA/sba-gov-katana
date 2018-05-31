FROM node:8.6.0

ENV PACKAGES netcat
RUN apt-get update && apt-get install -qq -y $PACKAGES --fix-missing --no-install-recommends

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/
RUN npm install node-sass --silent
RUN npm install --prod --silent

WORKDIR /usr/src/app
RUN mv /tmp/node_modules /usr/src/app/
COPY src/views /usr/src/app/views
COPY public /usr/src/app/public
COPY dist /usr/src/app/
COPY config /usr/src/app/config
COPY docker/docker-healthcheck.sh /usr/bin/docker-healthcheck
RUN chmod 555 /usr/bin/docker-healthcheck

HEALTHCHECK \
  --start-period=1m \
  --interval=30s \
  --timeout=3s \
  --retries=3 \
  CMD /usr/bin/docker-healthcheck

EXPOSE 3000
CMD ["node", "app.js"]
