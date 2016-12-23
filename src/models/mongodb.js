import {MongoClient} from "mongodb";
import config from "config";


function init(){
    return new Promise((resolve, reject) => {
        var url = config.get("database.mongoConnectString");
        MongoClient.connect(url , function(err, dbConnection) {
            if(err){
                reject(err);
            }else{
                console.log("Connected correctly to server at " + url);
                module.exports.dbConnection = dbConnection;
                resolve();
            }
        });
    });
}

module.exports.init = init;

