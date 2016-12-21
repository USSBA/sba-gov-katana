import mongodb from './models/mongodb.js';
import Promise from 'bluebird';
function init(){
    return mongodb.init();
}
export default init;
