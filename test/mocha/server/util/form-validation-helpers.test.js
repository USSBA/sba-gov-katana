import {
  nameValidation
} from "../../../../src/client/services/form-validation-helpers.js";

describe("# Validation Helpers", function() {
  describe("#nameValidation", function() {
    it("should pass with two names", function() {
      nameValidation("Luke Skywalker").should.be.true;
    })

    it("should pass with a hyphenated last name", function() {
      nameValidation("Leia Organa-Solor").should.be.true;
    })

    it("should pass with three names", function() {
      nameValidation("Jar Jar Binks").should.be.true;
    })

    it("should fail on one name", function() {
      nameValidation("Yoda").should.be.false;
    })

    it("should fail on one name if hyphenated", function() {
      nameValidation("R2-D2").should.be.false;
    })
  });

})
