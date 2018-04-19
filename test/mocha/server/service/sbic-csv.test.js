// Test the Creation of an SBIC CSV file

import chai from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

// import sbic-csv controller
// return csv file (based on the contacts.json file input)

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
