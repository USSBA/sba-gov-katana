# Katana development guide
Katana serves as the presentation layer for sba.gov. It is a Reactjs/Node.js application.  In production, Katana retrieves data from a number of sources,
including the Size Standards API, the Content API, and more. However, you do not need Daisho running in development for Katana to run, instead pulling statically from those data sources.

## Environment Setup
1. Install [NVM](https://github.com/creationix/nvm)
      * NVM is our node version manager of choice. Please follow the steps detailed on their repo.
2. Download and use the Node version specified in the [.nvmrc](https://github.com/USSBA/sba-gov-katana/blob/master/.nvmrc#L1)
   * Normally you would provide a version number to these commands, but in this project, the appropriate version is supplied to them by the .nvmrc
    ```sh
    nvm install && nvm use
    ```
   
3. Install ESLint: `npm install -g eslint`
4. [OPTIONAL] Setup a git precommit client hook `cp scripts/check-commit-message.sh .git/hooks/commit-msg && chmod 700 .git/hooks/commit-msg`
5. Setup AWS credentials in ~/.aws according to https://us-sba.atlassian.net/wiki/spaces/AWS/pages/945422337/AWS+CLI+with+MFA. L
earn more about configuring the AWS CLI here: http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html

## Development Process (without local database)
1. `npm install` to install the dependencies
1. Create a `local-development.yml` file based upon the [example.yml](/config/example.yml) provided.
      * Place it in `config/`
      * Replace any placeholders with the correct values
      * This sets configuration properties for the application ( database connections / daisho connections / feature flagging ) and is different for each environment. Your `local-development.yml` will override any properties you need to override (probably the database properties).
1. `npm start` to run the server/hot-reloader

## Running tests
1. `npm test` to execute the tests

### Directory Guide
* package.json - dependencies
* src
    * app.js - contains the high-level references to init.js, server.js and controller.js
    * init.js - configuration bootstrapping
    * server.js - express initializations
    * views - pug templates
    * controllers - request handler definitions grouped as controllers
    * models - for constituting objects retrieved from the database.
    * service - service modules
    * util - other utilities and logic
    * client
        * components 
        * stores
        * actions
* public - publically accessible folder for static content
    * assets
        * images - pngs and jpgs
        * videos
        * svgs
    * build
* test
    * controllers
    * util
    * client
        * views
        * stores
        * actions
* scripts
* *[auto-generated]* dist - the babelized server source-code