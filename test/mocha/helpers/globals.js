let chai = require('chai');
let sinonChai = require("sinon-chai");
let chaiAsPromised = require('chai-as-promised');
let expect = chai.expect;
require('sinon-as-promised');
chai.use(chaiAsPromised);

let sinon = require('sinon');
chai.use(sinonChai);

import Promise from 'bluebird';
var should = require('should');
