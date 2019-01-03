/*application entry point*/
const config = require('config')
const app = require('./server.js')

//listen to port
const port = config.get('server.port')
app.listen(port)
console.log('Express server listening on port ' + port)
