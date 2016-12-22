import {sendConfirmationEmail} from '../src/util/emailer.js';

sendConfirmationEmail("jking@fearless.tech","http://wwww.google.com")
.then(console.log)
.catch(console.error)
.finally(process.exit);