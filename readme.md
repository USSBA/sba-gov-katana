#  SBA.gov Node.js Component
## aka *Katana*

This project represents the new development for the SBA.gov website functionality.

For the development environment setup, see development.md

### Major Technologies Used
* Node.js
* React.js
* Gulp
* Webpack
* Express.js


### Directory Setup for Node Development

* Home
    * app.js - contains the high-level references to init.js, server.js and controller.js
    * init.js - configuration bootstrapping
    * server.js - express initializations
    * controller.js - controller initializations
    * package.json - dependencies
    * public - publically accessible folder for static content
        * assets
            * images
            * videos
        * build
    * views - pug templates
    * controllers - request handler definitions grouped as controllers
    * models - for constituting objects retrieved from the database.
    * utils
    * client
        * views
        * stores
        * actions
    * test
        * controllers
        * util
        * client
            * views
            * stores
            * actions
    * scripts


jenkins commit test1
