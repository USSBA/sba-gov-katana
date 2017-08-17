import { generateOcaPassword } from "../../../../src/util/password-manager.js"

describe('# Password Manager', function() {
  describe('# generateOcaPassword', function() {

    it('should return a valid password', function() {
      let iterations = 50;
      for (let i = 0; i < iterations; i++) {
        let password = generateOcaPassword();
        password.match(/.*[A-Z].*/).should.not.be.null;
        password.match(/.*[a-z].*/).should.not.be.null;
        password.match(/.*[0-9].*/).should.not.be.null;
        password.match(/.*[!@#$%^&].*/).should.not.be.null;
      }
    });

  })

});
