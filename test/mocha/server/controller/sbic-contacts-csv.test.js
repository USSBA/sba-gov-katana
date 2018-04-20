// Test the Creation of an SBIC CSV file

import chai from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import * as SbicContactsCsv from '../../../../src/controllers/sbic-contacts-csv.js'
import HttpStatus from 'http-status-codes'
//import Promise from 'bluebird'

// import sbic-contacts-csv controller
// return csv file (based on the contacts.json file input)

describe('SbicContactsCsv', () => {
  let stub
  let sandbox
  let contacts
  let response

  before(() => {
    // simulate axios get and return contacts data
    //sandbox = sinon.sandbox.create()
    contacts = fs.readFileSync(path.join(__dirname, './data/sbic/contacts.json'))
    stub = sinon.stub(axios, 'get')
    stub.returns(
      Promise.resolve({
        data: JSON.parse(contacts)
      })
    )

    // add spies to response object
    response = {
      header: sinon.spy(function() {
        return this
      }),
      status: sinon.spy(function() {
        return this
      }),
      send: sinon.spy(function() {
        return this
      })
    }

    console.log('ACAC--', contacts.length)
  })

  after(() => {
    stub.restore()
  })

  afterEach(() => {
    response.status.reset()
    response.send.reset()
  })

  it('#createCsvFromJson', done => {
    const result = String(SbicContactsCsv.createCsvFromJson(JSON.parse(contacts)))
    const expected = String(fs.readFileSync(path.join(__dirname, './data/sbic/contacts-expected.csv')))
    expected.should.equal(result)
    done()
  })

  it.skip('#downloadCsv', done => {
    // create spy
    // analyze response object

    // spy on downloadCsv

    //const spy = sinon.spy(SbicContactsCsv, "downloadCsv")

    const request = {
      body: {
        result: true
      },
      header: function() {
        return ''
      }
    }

    //const response = {}
    //const spy = sandbox.spy(response, "status")

    SbicContactsCsv.downloadCsv(request, response)

    //spy.calledWith(request, {})
    // was response.status called with 200?
    //console.log(response.status.calledWith(200))
    //console.log("BB--", spy.calledWith(request, response))
    console.log(response.send.called.should.be.true)

    /*const contacts = fs.readFileSync(path.join(__dirname, './data/sbic/contacts.json'));
    const result = String(SbicContactsCsv.downloadCsv(JSON.parse(contacts)));
    expected.should.equal(result);*/

    done()
  })
})
