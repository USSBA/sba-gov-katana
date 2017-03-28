import React from 'react'
export function getNameValidationState(name, value) {
  let validStates = {};
  var nameRegex = new RegExp(/^[a-z ,.'-]+$/i)
  if (nameRegex.test(value)) {
    validStates[name] = "success";
  } else if (value.length === 0) {
    validStates[name] = null;
  } else {
    validStates[name] = "error";
  }
  return validStates
}
export function getPhoneValidationState(name, value) {
  let validStates = {};
  var numberRegex = new RegExp(/^\d+$/)
  if (value.length >= 10 && numberRegex.test(value)) {
    validStates[name] = "success";
  } else {
    validStates[name] = null;
  }
  return validStates;
}
export function getEmailValidationState(name, value) {
  let validStates = {};
  var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)
  if (emailRegex.test(value)) {
    validStates[name] = "success";
  } else if (value.length === 0) {
    validStates[name] = null;
  } else if (!((emailRegex).test(value))) {
    validStates[name] = null;
  }
  return validStates;
}
export function getTextAlphanumeicValidationState(name, value) {
  let validStates = {};
  if (value.length > 0) {
    validStates[name] = "success";
  } else if (value.length === 0) {
    validStates[name] = null;
  } else {
    validStates[name] = "error"
  }
  return validStates;
}
export function getZipcodeValidationState(name, value) {
  let validStates = {};
  var numberRegex = new RegExp(/^\d+$/)
  if (value.length === 5 && numberRegex.test(value)) {
    validStates[name] = "success";
  } else {
    validStates[name] = null;
  }
  return validStates;
}
export function getWebsiteValidationState(name, value) {
  let validStates = {};
  var websiteRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
  if (websiteRegex.test(value)) {
    validStates[name] = "success"
  } else {
    validStates[name] = null
  }
  return validStates;
}
export function getSelectBoxValidationState(name, value) {
  let validStates = {};
  if (value !== null && value.length > 0) {
    validStates[name] = "success"
  } else {
    validStates[name] = null
  }
  return validStates
}
export function getCurrencyValidationState(name, value) {
  let validStates = {};
  if (value.length > 0) {
    validStates[name] = "success"
  } else {
    validStates[name] = null
  }
  return validStates
}
export function getAlwaysValidValidationState(name, value) {
  let validStates = {};
  validStates[name] = "success";
  return validStates;
}

export function containsErrorOrNull(items) {
  let found = false;
  for (var inputState in items) {
    if (items[inputState] === "error" || items[inputState] === null) {
      found = true;
    }
  }
  return found;
}
