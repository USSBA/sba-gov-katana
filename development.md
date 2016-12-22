# Development guide

## Environment Setup

This is for the development/build setup guide

1. Install Node and NPM `sudo [apt-get|yum] install npm node`
2. Install NVM (https://github.com/creationix/nvm)
3. Download and use Node Version 7.1 `nvm install 7.1 && nvm use 7.1`
4. Install ESLint: `npm install -g eslint`
5. Setup a git precommit client hook `cp scripts/check-commit-message.sh .git/hooks/commit-msg && chmod 700 .git/hooks/commit-msg`
6. ~~Install yarn https://yarnpkg.com/en/docs/install~~

## Development Process
1. ~~`yarn` to install the dependencies~~ `npm install`
2. Create config/local.yaml e.g.
>    database:
>        mongoConnectString: mongodb://localhost:27017/sba
>    linc:
>        confirmationEmailBase: "http://localhost:65097"
>
3. `npm start` to run the server/hot-reloader
4. `./scripts/run-local-mongo.sh` to execute a local mongo


## Build Process
1. ~~`yarn` to install the dependencies~~ `npm install`
3. `npm test` to execute the tests
4. `npm run build` to build the docker image
