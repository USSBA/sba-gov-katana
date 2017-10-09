const _ = require("lodash");
const Promise = require("bluebird");
const fs = require('fs');

const csvFiles=[
  {'name': 'SBDC', 'path': './raw-data/SBDC.txt'},
  {'name': 'VET', 'path': './raw-data/VET.txt'},
  {'name': 'PrtData', 'path': './raw-data/PrtData.txt'},
  {'name': 'SCORE', 'path': './raw-data/SCORE.txt'},
  {'name': 'WBC', 'path': './raw-data/WBC.txt'},
];

const replacedHeaders = ["Validprtprimcattyp","Validprtsubcattyp","Prtid","id","name1","name2","Validloctyp","street1","street2","city","state","zip","Geolattude","Geolngtude","phone","Fax","Web","Email","Lastupdtdt"];
const prtDataHeaders = ["ignore1","ignore2","ignore3","ignore4","ignore5","name1","name2","ignore6","street1","street2","city","state","zip","ignore7","ignore8","phone","fax","ignoreTheRest"];//,"","N","N","Y","Y","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"]
const relevantFields =    [4, 5, 7, 8,  9, 10, 11, 14];
const prtRelevantFields = [5, 6, 8, 9, 10, 11, 12, 15];

//const relevantFields = ["Prtlglnm","Prtlocnm","Phyaddrstr1txt","Phyaddrstr2txt","Phyaddrctynm","PhyAddrStCd","Phyaddrpostcd","Phone"];


const reducer = (accumulatedResult, file, index) => {
  return convertToJson(file['path'], file['name'] === 'PrtData')
    .then( data => {
      accumulatedResult[file['name']] = data;
      return accumulatedResult;
    })
    .catch( console.warn );
};

// Promisify convertToJson
convertToJson = function( file, isPrtData = false){
  console.log(`Converting file: ${file}...; isPrtData=${isPrtData}`);
  const csv=require('csvtojson');
  const converter = csv({
    delimiter: '|',                  // Set delimiter
    escape: '\\',                    // Switch escape character
    includeColumns: isPrtData ? prtRelevantFields : relevantFields,  // Be selective with columns
    headers: isPrtData ? prtDataHeaders : replacedHeaders, // Rewrite names of existing columns
    noheader: isPrtData,             // No header row if PrtData file
  });
	return new Promise( (res, rej) => {
    converter
    .preRawData((csvRawData,cb)=>{
      var newData=csvRawData.replace('"','');
      cb(newData);
    })
		.on("end_parsed", (jsonData) => {
			if(!jsonData){
				rej("CSV to JSON conversion failed!")
			}
      console.log(`Finished ${file} with ${jsonData.length} rows`);
			res(jsonData);
		});
		fs.createReadStream(file).pipe(converter);
	});
};


const parsedDataPromise = Promise.reduce( csvFiles, reducer, {});

parsedDataPromise.then(result => {
  console.log('Parsed all the data!  Writing output to output.json');
  fs.writeFileSync('./output.json', JSON.stringify(result));
  //// Debug output with human readable spacing
  //fs.writeFileSync('./output.json', JSON.stringify(result, null, 2));
});

