const phoneMaxLength = 10;
const zipMaxLength = 5;

export function getNameValidationState(name, value, defaultWhenNotSuccessful) {
  const validStates = {};
  const nameRegex = new RegExp(/^[a-z ,.'-]+$/i);
  if (nameRegex.test(value)) {
    validStates[name] = "success";
  } else {
    validStates[name] = defaultWhenNotSuccessful;
  }
  return validStates;
}
export function getPhoneValidationState(name, value, defaultWhenNotSuccessful) {
  const validStates = {};
  const numberRegex = new RegExp(/^\d+$/);
  if (value && value.length >= phoneMaxLength && numberRegex.test(value)) {
    validStates[name] = "success";
  } else {
    validStates[name] = defaultWhenNotSuccessful;
  }
  return validStates;
}
export function getEmailValidationState(name, value, defaultWhenNotSuccessful) {
  const validStates = {};
  const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/);
  if (emailRegex.test(value)) {
    validStates[name] = "success";
  } else {
    validStates[name] = defaultWhenNotSuccessful;
  }
  return validStates;
}
export function getTextAlphanumeicValidationState(name, value, defaultWhenNotSuccessful) {
  const validStates = {};
  if (value.length > 0) {
    validStates[name] = "success";
  } else {
    validStates[name] = defaultWhenNotSuccessful;
  }
  return validStates;
}
export function getZipcodeValidationState(name, value, defaultWhenNotSuccessful) {

  const validStates = {};
  const numberRegex = new RegExp(/^\d+$/);
  if (value.length === zipMaxLength && numberRegex.test(value)) {
    validStates[name] = "success";
  } else {
    validStates[name] = defaultWhenNotSuccessful;
  }
  return validStates;
}
export function getWebsiteValidationState(name, value, defaultWhenNotSuccessful) {
  const validStates = {};
  const websiteRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/);
  if (websiteRegex.test(value)) {
    validStates[name] = "success";
  } else {
    validStates[name] = defaultWhenNotSuccessful;
  }
  return validStates;
}
export function getSelectBoxValidationState(name, value, defaultWhenNotSuccessful) {
  const validStates = {};
  if (value !== null && value.length > 0) {
    validStates[name] = "success";
  } else {
    validStates[name] = defaultWhenNotSuccessful;
  }
  return validStates;
}
export function getCurrencyValidationState(name, value, defaultWhenNotSuccessful) {
  const validStates = {};
  if (value.length > 0) {
    validStates[name] = "success";
  } else {
    validStates[name] = defaultWhenNotSuccessful;
  }
  return validStates;
}
export function getAlwaysValidValidationState(name, value) {
  const validStates = {};
  validStates[name] = "success";
  return validStates;
}

export function containsErrorOrNull(items) {
  let found = false;
  for (const inputState in items) {
    if (items[inputState] === "error" || items[inputState] === null) {
      found = true;
    }
  }
  return found;
}

export function containsError(items) {
  let found = false;
  for (const inputState in items) {
    if (items[inputState] === "error") {
      found = true;
    }
  }
  return found;
}
