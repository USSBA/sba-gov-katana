import { init as initDatabase } from './models/db.js'
function init() {
  return Promise.all([initDatabase()])
}
export default init
