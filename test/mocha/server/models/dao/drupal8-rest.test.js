import {
  fetchById
} from "../../../../../src/models/dao/drupal8-rest.js";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let chai = require('chai');
let expect = chai.expect;


describe("Drupal 8 ReST client", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  })

  afterEach(() => {
    mock.reset();
  });

  after(() => {
    mock.restore();
  })

  it('should return the response data in the normal case', (done) => {
    mock.onGet('/node/1/').reply(200, {
      value: 1
    });

    fetchById('node', 1).then(function(result) {
      result.should.not.be.null;
      result.should.have.property('value');
      result.value.should.equal(1);
    }).then(done);
  });

  it('should respond with null if no data is found', (done) => {
    mock.onGet('/node/2/').reply(204);

    fetchById('node', 2).then(function(result) {
      expect(result).to.be.null;
    }).then(done);
  });

  it.only('should respond with null if the server returns a 404', (done) => {
    mock.onGet('/node/3/').reply(404);

    fetchById('node', 3).then(function(result) {
      expect(result).to.be.null;
    }).then(done);
  });
});
