import {db as db} from '../mongodb.js';
import Promise from 'bluebird';
import uuid from 'uuid';

function create(newConfirmation) {
    newConfirmation._id = uuid.v4();
    return new Promise((resolve, reject) => {
        var collection = db.collection('emailConfirmation');
        // Insert some documents
        collection.insert(newConfirmation, function(err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });

}

function retrieve(tokenString) {
    return new Promise((resolve, reject) => {
        var collection = db.collection('emailConfirmation');
        // Insert some documents
        collection.findOne({
            token: tokenString
        }, function(err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

function update(emailConfirmation) {
    return new Promise((resolve, reject) => {
        var collection = db.collection('emailConfirmation');
        // Insert some documents
        collection.findOneAndReplace({
            token: emailConfirmation.token
        },emailConfirmation, function(err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });


}

export {create, retrieve, update};
