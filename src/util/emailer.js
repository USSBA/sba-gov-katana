import * as nodemailer from 'nodemailer';
import pug from 'pug';
import config from 'config';
import Promise from 'bluebird';
import path from 'path';
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

function sendConfirmationEmail(to, confirmationLink) {
    return new Promise((resolve, reject) => {
        // setup e - mail data with unicode symbols
        var mailOptions = {
            from: config.get('email.sender'),
            to: to,
            subject: 'LenderMatch Confirmation Email',
            text: "Thank you for applying to LenderMatch! Please visit the link below to confirm your email: " + confirmationLink,
            html: pug.renderFile(path.join(__dirname, '../views/confirmation-email.pug'), {
                confirmationLink: confirmationLink
            })
        };
        if (config.get("debugEmailOnly")) {
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
