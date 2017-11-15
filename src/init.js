import { init as initDatabase } from './models/db.js'
import * as cron from './util/cron.js'
function init() {
  return Promise.all([initDatabase(), cron.init()])
}
export default init
