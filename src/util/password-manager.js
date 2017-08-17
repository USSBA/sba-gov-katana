/* eslint-disable */
import config from "config";
var encryptor = require("simple-encryptor")(config.get("oca.soap.passwordDecryptionKey"));
var generatePassword = require("password-generator");


var maxLength = 12;
var minLength = 8;
var uppercaseMinCount = 1;
var lowercaseMinCount = 1;
var numberMinCount = 1;
var specialMinCount = 1;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var SPECIAL_CHAR_RE = /([!@#$%^&])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

function isStrongEnough(password) {
  var uc = password.match(UPPERCASE_RE);
  var lc = password.match(LOWERCASE_RE);
  var n = password.match(NUMBER_RE);
  var sc = password.match(SPECIAL_CHAR_RE);
  var nr = password.match(NON_REPEATING_CHAR_RE);
  return password.length >= minLength &&
    !nr &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount;
}

function generateOcaPassword() {
  var password = "";
  var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongEnough(password)) {
    password = generatePassword(randomLength, false, /[\w\d!@#$%^&]/);
  }
  return password;
}


function decryptPassword(password) {
  return encryptor.decrypt(password);
}

function encryptPassword(password) {
  return encryptor.encrypt(password);
}

export { generateOcaPassword, decryptPassword, encryptPassword };
