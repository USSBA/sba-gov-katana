#  SBA.gov Front-End
## aka *Katana*

This project contains the code for the SBA.gov front-end (aka head) that sits in front of the headless Drupal

For the development environment setup, see [development.md]

### Major Technologies Used
* Node.js
* React.js
* Redux
* Webpack
* Express.js


### Directory Setup for Node Development

* Root
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