FROM node:8.3.0

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

EXPOSE 3000

CMD ["node", "app.js"]
