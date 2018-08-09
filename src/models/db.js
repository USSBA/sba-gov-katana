import { nonDrupal } from './db-connect.js'

function init() {
  return nonDrupal
    .sync()
    .then(() => {
      console.log('Database sync complete')
    })
    .catch(function(error) {
      console.error(error)
    })
}

export { init }
