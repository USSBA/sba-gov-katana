const chai = require('chai')
chai.should()
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')

const expect = chai.expect

// require('sinon-as-promised');
chai.use(chaiAsPromised)

const sinon = require('sinon')
chai.use(sinonChai)

import Promise from 'bluebird'
