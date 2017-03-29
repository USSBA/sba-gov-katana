import * as nodemailer from "nodemailer";
import config from "config";
import Promise from "bluebird";
import _ from "lodash";

var transporter = nodemailer.createTransport({
  sendmail: true,
  newline: "unix",
  path: "/usr/sbin/sendmail"
});

function sendConfirmationEmail(options) {
  return new Promise((resolve, reject) => {
    var defaultMailOptions = { from : config.get("email.sender"),
      to: config.get("email.sender"),
      subject: "SBA Test Email",
      text: "Test Email",
      html: "<p>This is a test</p>"
    };
    var mailOptions = _.assign({}, defaultMailOptions, options);
    if (config.get("email.debugEmailOnly")) {
      console.log("Email sender would have sent:" + JSON.stringify(mailOptions, 0, 4)); //eslint-disable-line no-magic-numbers
      resolve();
    } else {
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    }
  });
}
export { sendConfirmationEmail };
