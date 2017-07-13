var validData = "<p><strong>Strong</strong></p>\r\n\r\n<p><em>Italic</em></p>\r\n\r\n<ol>\r\n\t<li>First</li>\r\n\t<li>Second</li>\r\n\t<li>Third</li>\r\n</ol>\r\n\r\n<ul>\r\n\t<li>A New Hope</li>\r\n\t<li>Empire Strikes Back</li>\r\n\t<li>Shadows of the Empire</li>\r\n</ul>\r\n\r\n<hr />\r\n<p><a href=\"https://www.google.com\">https://www.google.com</a></p>\r\n\r\n<table>\r\n\t<thead>\r\n\t\t<tr>\r\n\t\t\t<th>Month</th>\r\n\t\t\t<th>Savings</th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tfoot>\r\n\t\t<tr>\r\n\t\t\t<td>Sum</td>\r\n\t\t\t<td>$180</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n\t<tbody>\r\n\t\t<tr>\r\n\t\t\t<td>January</td>\r\n\t\t\t<td>$109000000</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>February</td>\r\n\t\t\t<td>$800000</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n\r\n<dl>\r\n\t<dt>Coffee</dt>\r\n\t<dd>Black hot drink</dd>\r\n\t<dt>Milk</dt>\r\n\t<dd>White cold drink</dd>\r\n</dl>\r\n";

var exampleXSSAttack = "<script>alert(document.cookie)</script>";

import feedbackData from "./feedback.json"
import fs from "fs";
let formattedFeedbackData = fs.readFileSync("test/mocha/server/util/formatted-feedback.csv", "utf-8");

import {
  sanitizeTextSectionHtml,
  formatFeedbackData,
  formatUrl
} from "../../../../src/util/formatter.js";

describe("#Formatter", function() {
  describe("#sanitizeHtml", function() {
    it("should return nothing when there is only a script tag", function(done) {
      let clean = sanitizeTextSectionHtml(exampleXSSAttack);
      clean.should.equal("");
      done();
    })

    it("should remove the script tag next to a p tag", function(done) {
      let clean = sanitizeTextSectionHtml("<p>Test123</p>" + exampleXSSAttack);
      clean.should.equal("<p>Test123</p>");
      done();
    })

    it("should remove the script tag inside of a p tag", function(done) {
      let clean = sanitizeTextSectionHtml("<p>Test123" + exampleXSSAttack + "</p>");
      clean.should.equal("<p>Test123</p>");
      done();
    })

    it("should not touch the data because it is all valid", function(done) {
      let clean = sanitizeTextSectionHtml(validData);
      clean.should.equal(validData);
      done();
    })
  });

  describe("#formatFeedbackData", function() {
    it("should return nothing when there is only a script tag", function(done) {
      let formatted = formatFeedbackData(feedbackData)
      formatted.should.equal(formattedFeedbackData);
      done();
    })
  });

  describe("#formatUrl", function() {
    it("should use the url when provided with only one ", function(done) {
      let url = formatUrl("/business-guide")
      url.should.equal("business-guide");
      done();
    })

    it("should use the last element of url when provided a nested path ", function(done) {
      let url = formatUrl("/business-guide/plan/")
      url.should.equal("plan");
      done();
    })

    it("should  use the last element of url when provided a full path ", function(done) {
      let url = formatUrl("/business-guide/plan/calculate-startup-costs-small-business")
      url.should.equal("calculate-startup-costs-small-business");
      done();
    })

    it("should set the url to a kebab case version of the title ", function(done) {
      let url = formatUrl("/node/50", "Calculate startup costs")
      url.should.equal("calculate-startup-costs");
      done();
    })

    it("should remove useless words", function(done) {
      let url = formatUrl("/node/50", "Calculate the startup costs of a small business")
      url.should.equal("calculate-startup-costs-small-business");
      done();
    })

    it("should convert everything to lower case ", function(done) {
      let url = formatUrl("/node/50", "CalCulate The Startup costs")
      url.should.equal("calculate-startup-costs");
      done();
    })

    it("should convert nonASCII characters to ASCII letters ", function(done) {
      let url = formatUrl("/node/50", "Use The Force Lúke")
      url.should.equal("use-force-luke");
      done();
    })

    it("should all the nonASCII characters to ASCII letters ", function(done) {
      let url = formatUrl("/node/50", "中文 español deutsch English हिन्दी العربية português বাংলা русский 日本語 ਪੰਜਾਬੀ 한국어 தமிழ் עברית")
      url.should.equal("zhong-wen-espanol-deutsch-english-hindii-laarby-portugues-baa-nlaa-russkiy-ri-ben-yu-p-njaabii-hangugeo-tmilll-bryt");
      done();
    })

    it("should remove punctuation", function(done) {
      let url = formatUrl("/node/50", "Use? The: Force; Luke!")
      url.should.equal("use-force-luke");
      done();
    })


  });
});
