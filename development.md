# Development guide

## Environment Setup

This is for the development/build setup guide

1. Install NVM (https://github.com/creationix/nvm)
1. Download and use Node Version 7.1 `nvm install 7.1 && nvm use 7.1`
1. Install ESLint: `npm install -g eslint`
1. Setup a git precommit client hook `cp scripts/check-commit-message.sh .git/hooks/commit-msg && chmod 700 .git/hooks/commit-msg`

## Development Process
1. `npm install`
1. Download mysql seed data
    - Setup AWS credentials in ~/.aws
    - execute `./scripts/db/sql/download-sql.sh`
1. `./scripts/db/run-db.sh` to execute a local mysql
1. Create config/local-development.yaml to customize your options
1. `npm start` to run the server/hot-reloader

## Build Process
1. `npm install`
1. `npm test` to execute the tests
1. `npm run build` to build the docker image
