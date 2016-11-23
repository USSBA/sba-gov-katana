FROM node:7.0.0

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY dist /usr/src/app/
COPY public /usr/src/app/public
COPY config /usr/src/app/config
RUN mv /tmp/node_modules /usr/src/app/
COPY src/views /usr/src/app/src/views

EXPOSE 3000

CMD ["node", "app.js"]
