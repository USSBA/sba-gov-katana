import {db} from '../mongodb.js';
import Promise from 'bluebird';
import uuid from 'uuid';


function create(formData) {
    formData._id = uuid.v4();
    return new Promise((resolve, reject) => {
        var collection = db.collection('lenderMatchRecord');
        // Insert some documents
        collection.insert(formData, function(err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result.ops[0]);
            }
        });
    });
}

function retrieve(id) {
      return new Promise((resolve, reject) => {
          var collection = db.collection('lenderMatchRecord');
          // Insert some documents
          collection.find([
              _id: id
          ], function(err, result) {
              if(err){
                  reject(err);
              }else{
                  resolve(result);
              }
          });
      });
}

export {create, retrieve};
