import {MongoClient} from 'mongodb';
import config from 'config';


function init(){
    return new Promise((resolve, reject) => {
        var url = config.get('database.mongoConnectString');
        MongoClient.connect(url , function(err, db) {
            if(err){
                reject(err)
            }else{
                console.log("Connected correctly to server at "+ url);
                module.exports.db = db;
                resolve();
            }
        });
    });
}

module.exports.init = init;
