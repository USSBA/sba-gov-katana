import * as nodemailer from "nodemailer";
import config from "config";
import Promise from "bluebird";
import _ from "lodash";

const sendMailConnectionOptions = {
  sendmail: true,
  newline: "unix",
  path: "/usr/sbin/sendmail"
};

var sesConnectionOptions = {
  secure: true,
  host: config.get("email.hostname"),
  auth: {
    user: config.get("email.username"),
    pass: config.get("email.password")
  },
  logger: true
};

var transporter = nodemailer.createTransport(sesConnectionOptions);

function sendConfirmationEmail(options) {
  return new Promise((resolve, reject) => {
    var defaultMailOptions = {
      from: config.get("email.sender"),
      to: config.get("email.sender"),
      subject: "SBA Test Email",
      text: "Test Email",
      html: "<p>This is a test</p>"
    };
    var mailOptions = _.assign({}, defaultMailOptions, options);
    if (config.get("email.debugEmailOnly")) {
      console.log(
        // eslint-disable-next-line no-magic-numbers
        "Email sender would have sent:" + JSON.stringify(mailOptions, 0, 4)
      );
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
