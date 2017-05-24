import {
  findPageLineage
} from "../../../../src/client/services/menu.js";

import menu from "./menu.json"

describe("#Formatter", function() {
  describe("#findPageLineage", function() {
    it("should ", function(done) {
      let lineage = findPageLineage(menu, ["guide", "plan", "market"]);
      lineage.should.have.length(3);
      lineage[0].url.should.equal("guide");
      lineage[1].url.should.equal("plan");
      lineage[2].url.should.equal("market");
      done();
    })
  })
})
