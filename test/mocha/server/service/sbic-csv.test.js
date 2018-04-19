// Test the Creation of an SBIC CSV file

// pull in sbic data by query parameters
// result should equal expected data based on query

import chai from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

// import sbic-csv controller
// return csv file

describe('SbicCsv', () => {
  before(() => {
    // simulate axios get and return contacts data
    const stub = sinon.stub(axios, 'get')
    const contacts = fs.readFileSync(path.join(__dirname, './data/sbic/contacts.json'))
    stub.returns(
      Promise.resolve({
        contacts
      })
    )
  })

  it('should return a file format with .csv extention', () => {})
})
