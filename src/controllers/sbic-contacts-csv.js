const axios = require('axios')
const httpStatus = require('http-status-codes')
const jsonToCsv = require('json2csv')
const config = require('config')

// get SBIC json data return a csv file

function downloadCsv(req, res) {
  // choosing to utilize axios OVER an import of the service
  // because making a "GET" request will allow this controller
  // to utilize a micro-service located at the following endpoint:
  const url = 'https://' + config.get('server.fqdn') + '/api/content/search/contacts.json?category=SBIC'
  axios
    .get(url)
    .then(result => {
      const csv = createCsvFromJson(result.data)
      res
        .header('Content-Type', 'text/csv')
        .status(httpStatus.OK)
        .send(csv)
    })
    .catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
}

function createCsvFromJson(jsonData) {
  const fields = Object.keys(jsonData[0])
  return jsonToCsv({
    data: jsonData,
    fields
  })
}

module.exports.downloadCsv = downloadCsv
module.exports.createCsvFromJson = createCsvFromJson
