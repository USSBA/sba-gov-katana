# Development guide

## Environment Setup

This is for the development/build setup guide

1. Install Node and NPM
2. Install ESLint: `npm install -g eslint`
3. Setup a git precommit client hook `cp scripts/check-commit-message.sh .git/hooks/commit-msg && chmod 700 .git/hooks/commit-msg`
4. Install yarn https://yarnpkg.com/en/docs/install

## Development Process
1. `yarn` to install the dependencies
2. `npm start` to run the server/hot-reloader


## Build Process
1. `yarn` to install the dependencies
3. `npm test` to execute the tests
4. `npm run build` to build the docker image
