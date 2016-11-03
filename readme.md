#  SBA.gov Node.js Component
## aka Katana

This project represents the new development for the SBA.gov website functionality. 

### Major Technologies Used
Node.js
React.js
Gulp
Webpack
Express.js


### Directory Setup for Node Development

Home
....*app.js - contains the high-level references to init.js, server.js and controller.js
....*init.js - other initializations
....*server.js - express intializations
....*controller.js - controller initializations
....*package.json - dependencies
....*public - publically accessible folder for static content
........*assets
............*images
............*videos
........*build
....*views
........*ejs files - view templates can be ejs or pug or anything else
....*controllers - request handler definitions grouped as controllers
....*test
........*controllers
........*util
........*client
............*views
............*stores
............*actions
....*utils
....*client
........*views
........*stores
........*actions
....*models - for constituting objects retrieved from the database.
....*scripts
