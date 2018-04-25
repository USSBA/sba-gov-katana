// Test the Creation of an SBIC CSV file

import chai from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import config from 'config'
import fs from 'fs'
import path from 'path'
import HttpStatus from 'http-status-codes'
import * as SbicContactsCsv from '../../../../src/controllers/sbic-contacts-csv.js'

// import sbic-contacts-csv controller
// return csv file (based on the contacts.json file input)

describe('SbicContactsCsv', () => {
  let contacts

  before(() => {
    contacts = JSON.parse(fs.readFileSync(path.join(__dirname, './data/sbic/contacts.json')))
  })

  describe('#createCsvFromJson', () => {
    it('expected csv file should match the result csv file', done => {
      // compare result Csv to the expected Csv
      const result = SbicContactsCsv.createCsvFromJson(contacts)
      const expected = String(fs.readFileSync(path.join(__dirname, './data/sbic/contacts-expected.csv')))
      result.should.equal(expected)
      done()
    })
  })

  describe('#downloadCsv', () => {
    let stubAxiosGet
    let stubConfigGet
    let response

    before(() => {
      // simulate axios get and return contacts data
      stubAxiosGet = sinon.stub(axios, 'get')
      stubAxiosGet.returns(
        Promise.resolve({
          data: contacts
        })
      )

      // simulate config get and return contacts data
      stubConfigGet = sinon.stub(config, 'get')
      stubConfigGet.returns('no-domain.com')
    })

    after(() => {
      stubAxiosGet.restore()
      stubConfigGet.restore()
    })

    beforeEach(() => {
      // add spies to response object
      // then overwrite methods with spies that assert expectations

      response = {
        header: sinon.spy(function(resultField, resultValue) {
          return this
        }),
        status: sinon.spy(function(result) {
          return this
        }),
        send: sinon.spy(function(result) {
          return this
        })
      }
    })

    afterEach(() => {
      response.header.reset()
      response.status.reset()
      response.send.reset()
    })

    it('should set the response header Content-Type to text/csv', function(done) {
      response.header = sinon.spy(function(resultField, resultValue) {
        // if there is a timeout then that means one of these asserts evaluated to false
        const expectedField = 'Content-Type'
        const expectedValue = 'text/csv'
        resultField.should.equal(expectedField)
        resultValue.should.equal(expectedValue)
        done()
      })

      SbicContactsCsv.downloadCsv({}, response)
    })

    it('should set the response status to 200', done => {
      response.status = sinon.spy(function(result) {
        // if there is a timeout then that means this assert evaluated to false
        const expected = HttpStatus.OK
        result.should.equal(expected)
        done()
      })

      SbicContactsCsv.downloadCsv({}, response)
    })

    it('should provide csv file to be downloaded', done => {
      response.send = sinon.spy(function(result) {
        // if there is a timeout then that means one of these asserts evaluated to false
        const expected = SbicContactsCsv.createCsvFromJson(contacts)
        result.should.equal(expected)
        done()
      })

      SbicContactsCsv.downloadCsv({}, response)
    })
  })
})
