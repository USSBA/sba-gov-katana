# Katana development guide
Katana serves as the presentation layer for sba.gov. It is a React-Redux/Node application. Katana must connect to the data cacheing layer [Daisho](https://github.com/USSBA/sba-gov-daisho) to run properly. So please ensure you have set it up before attempting to run Katana.

## Environment Setup
1. Install NVM (https://github.com/creationix/nvm)
      * NVM is our node version manager of choice. Please follow the steps detailed on their repo.
2. Download and use the Node version specified in the [Dockerfile](https://github.com/USSBA/sba-gov-katana/blob/master/Dockerfile#L1)
```sh
nvm install <node-version> && nvm use
```
3. Install ESLint: `npm install -g eslint`
4. Setup a git precommit client hook `cp scripts/check-commit-message.sh .git/hooks/commit-msg && chmod 700 .git/hooks/commit-msg`

## Development Process
1. `npm install` ensure you are using the correct node version
2. Download mysql seed data
    - Setup AWS credentials in ~/.aws
    - execute `./scripts/db/sql/download-sql.sh`
3. `./scripts/db/run-db.sh` to execute a local mysql
4. Create a [local-development.yaml](#local-development-yaml) file based upon the sample provided. Place it in `config/`
      * This sets configuration properties for the application ( database connections / daisho connections / feature flagging ) and is different for each environment. Your [local-development.yaml](#local-development-yaml) will override any properties you need to override (probably the database properties).
5. `npm start` to run the server/hot-reloader

## Build Process
1. `npm install`
1. `npm test` to execute the tests
1. `npm run build` to build the docker image

## Local Docker Process
1. Prereqs
    - Access to Daisho-as-a-Service
    - Install [docker-compose](https://docs.docker.com/compose/install/)
    - AWS credentials configured
1. `cd scripts/db/ && ./download-katana-sql.sh`
1. `npm run build` to package up the data
1. `docker-compose up`
1. Browse to localhost:3000
1. Kill with ctrl-c
1. `docker-compose down` to remove containers
1. `npm run build && docker-compose build katana` to rebuild local image

# local development yaml
```yaml
daisho:
  hostname: "http://localhost" (or whatever hostname your daisho is using...)
  port: 3001 (or whatever port your daisho is using...)
database:
  drupal:
    databaseName: sba_prod
    host: db2.sba.fun
    password: placeholder
    user: root
  nonDrupal:
    host: db2.sba.fun
    password: placeholder
    user: root
developmentOptions:
  client:
    logging: true
  useLocalDataNotDaisho: false
drupal:
  hostname: "http://www.sba.fun/"
drupal8:
  hostname: "http://content.sba.fun/"
  useLocalContacts: true
aws:
  access: placeholder
  secret: placeholder

```
