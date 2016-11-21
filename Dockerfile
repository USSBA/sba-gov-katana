FROM node:7.0.0

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY dist /usr/src/app/
COPY public /usr/src/public
RUN mv /tmp/node_modules /usr/src/app/

EXPOSE 3000

CMD ["node", "app.js"]