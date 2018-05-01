import axios from 'axios'
import HttpStatus from 'http-status-codes'
import json2csv from 'json2csv'
import config from 'config'

// get SBIC json data return a csv file

function downloadCsv(req, res) {
  // choosing to utilize axios OVER an import of the service
  // because making a "GET" request will allow this controller
  // to utilize a micro-service located at the following endpoint:
  const url = 'https://' + config.get('server.fqdn') + '/api/content/contacts.json?category=SBIC'
  axios
    .get(url)
    .then(result => {
      const csv = createCsvFromJson(result.data)
      res
        .header('Content-Type', 'text/csv')
        .status(HttpStatus.OK)
        .send(csv)
    })
    .catch(error => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
}

function createCsvFromJson(jsonData) {
  const fields = Object.keys(jsonData[0])
  return json2csv({
    data: jsonData,
    fields
  })
}

export { downloadCsv, createCsvFromJson }
