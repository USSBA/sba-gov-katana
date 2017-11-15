/* eslint-disable */
import config from 'config'
var encryptor = require('simple-encryptor')(config.get('oca.soap.passwordDecryptionKey'))
var generatePassword = require('password-generator')
var _ = require('lodash')

var length = 12
var uppercaseMinCount = 1
var lowercaseMinCount = 1
var numberMinCount = 1
var specialMinCount = 1
var UPPERCASE_RE = /([A-Z])/g
var LOWERCASE_RE = /([a-z])/g
var NUMBER_RE = /([\d])/g
var SPECIAL_CHAR_RE = /([!@#$%^&])/g
var ALL_CHAR_RE = /([A-Za-z\d!@#$%^&])/g

function shuffle(input) {
  var split = input.split('')
  var shuffled = _.shuffle(split)
  return shuffled.join('')
}

function generateOcaPassword() {
  let upper = generatePassword(uppercaseMinCount, false, UPPERCASE_RE)
  let lower = generatePassword(lowercaseMinCount, false, LOWERCASE_RE)
  let number = generatePassword(numberMinCount, false, NUMBER_RE)
  let special = generatePassword(specialMinCount, false, SPECIAL_CHAR_RE)
  let rest = generatePassword(
    length - uppercaseMinCount - lowercaseMinCount - numberMinCount - specialMinCount,
    false,
    ALL_CHAR_RE
  )
  let combined = upper + lower + special + number + rest
  return shuffle(combined)
}

function decryptPassword(password) {
  return encryptor.decrypt(password)
}

function encryptPassword(password) {
  return encryptor.encrypt(password)
}

export { generateOcaPassword, decryptPassword, encryptPassword }
