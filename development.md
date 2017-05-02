# Development guide

## Environment Setup

This is for the development/build setup guide

1. Install Node and NPM `sudo [apt-get|yum] install npm node`
2. Install NVM (https://github.com/creationix/nvm)
3. Download and use Node Version 7.1 `nvm install 7.1 && nvm use 7.1`
4. Install ESLint: `npm install -g eslint`
5. Setup a git precommit client hook `cp scripts/check-commit-message.sh .git/hooks/commit-msg && chmod 700 .git/hooks/commit-msg`

## Development Process
1. `npm install`
2. Download mysql seed data
    - Setup AWS credentials in ~/.aws
    - execute `./scripts/db/sql/download-sql.sh`
3. `./scripts/db/run-db.sh` to execute a local mysql
4. Create config/local.yaml to customize your options
5. `npm start` to run the server/hot-reloader

## Build Process
1. `npm install`
3. `npm test` to execute the tests
4. `npm run build` to build the docker image
