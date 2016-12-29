import {sendConfirmationEmail} from '../src/util/emailer.js';


var mailOptions = {
  to: "sigfried24@gmail.com",
  subject: "Almost done! Confirm your email to find lenders",
  text: "Test123",
  html: "Test123"
};
sendConfirmationEmail(mailOptions)
.then(console.log)
.catch(console.error)
.finally(process.exit);
