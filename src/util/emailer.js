import * as nodemailer from 'nodemailer';
import config from 'config';
import Promise from 'bluebird';
import _ from 'lodash';


var connectionOptions = {
    secure: true,
    port: 465,
    host: config.get("email.hostname"),
    auth: {
        user: config.get("email.username"),
        pass: config.get('email.password')
    },
    logger: true,
    debug: true
};
var transporter = nodemailer.createTransport(connectionOptions);

function sendConfirmationEmail(options) {
    return new Promise((resolve, reject) => {
        var defaultMailOptions = {
            from: config.get('email.sender'),
            to: config.get('email.sender'),
            subject: 'SBA Test Email',
            text: "Test Email",
            html: "<p>This is a test</p>"
        };
        var mailOptions = _.assign({}, defaultMailOptions, options);
        if (config.get("email.debugEmailOnly")) {
            console.log("Email sender would have sent:" + JSON.stringify(mailOptions, 0, 4));
            resolve();
        }
        else {
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    reject(error);
                }
                else {
                    return resolve(info);
                }
            });
        }
    });
}
export {
    sendConfirmationEmail
};
