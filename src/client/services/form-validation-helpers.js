const phoneMaxLength = 10
const zipMaxLength = 5

function executeValidation(name, value, defaultWhenNotSuccessful, tester) {
  const validStates = {}
  if (tester(value)) {
    validStates[name] = 'success'
  } else {
    validStates[name] = defaultWhenNotSuccessful
  }
  return validStates
}

export function nameValidation(value) {
  // checks that there is multiple words; notice however that the second regex also captures spaces in order to allow three or more words
  const nameRegex = new RegExp(/^[a-z,.'-]+\s+[a-z ,.'-]+$/i)

  return nameRegex.test(value)
}

export function phoneValidation(value) {
  const numberRegex = new RegExp(/^\d+$/)
  return value && value.length >= phoneMaxLength && numberRegex.test(value)
}

export function emailValidation(value) {
  const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
  return emailRegex.test(value)
}

export function hasLengthGreaterThanZero(value) {
  return value !== null && value.length > 0
}

export function zipCodeValidation(value) {
  const numberRegex = new RegExp(/^\d+$/)
  return value.length === zipMaxLength && numberRegex.test(value)
}

export function domainNameValidation(value) {
  const websiteRegex = new RegExp(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  )
  return websiteRegex.test(value)
}

export function getNameValidationState(name, value, defaultWhenNotSuccessful) {
  return executeValidation(
    name,
    value,
    defaultWhenNotSuccessful,
    nameValidation
  )
}
export function getPhoneValidationState(name, value, defaultWhenNotSuccessful) {
  return executeValidation(
    name,
    value,
    defaultWhenNotSuccessful,
    phoneValidation
  )
}
export function getEmailValidationState(name, value, defaultWhenNotSuccessful) {
  return executeValidation(
    name,
    value,
    defaultWhenNotSuccessful,
    emailValidation
  )
}
export function getTextAlphanumeicValidationState(
  name,
  value,
  defaultWhenNotSuccessful
) {
  return executeValidation(
    name,
    value,
    defaultWhenNotSuccessful,
    hasLengthGreaterThanZero
  )
}
export function getZipcodeValidationState(
  name,
  value,
  defaultWhenNotSuccessful
) {
  return executeValidation(
    name,
    value,
    defaultWhenNotSuccessful,
    zipCodeValidation
  )
}
export function getWebsiteValidationState(
  name,
  value,
  defaultWhenNotSuccessful
) {
  return executeValidation(
    name,
    value,
    defaultWhenNotSuccessful,
    domainNameValidation
  )
}
export function getSelectBoxValidationState(
  name,
  value,
  defaultWhenNotSuccessful
) {
  return executeValidation(
    name,
    value,
    defaultWhenNotSuccessful,
    hasLengthGreaterThanZero
  )
}
export function getCurrencyValidationState(
  name,
  value,
  defaultWhenNotSuccessful
) {
  return executeValidation(
    name,
    value,
    defaultWhenNotSuccessful,
    hasLengthGreaterThanZero
  )
}

export function getAlwaysValidValidationState(name, value) {
  return executeValidation(name, value, null, () => {
    return true
  })
}

export function containsErrorOrNull(items) {
  let found = false
  for (const inputState in items) {
    if (items[inputState] === 'error' || items[inputState] === null) {
      found = true
    }
  }
  return found
}

export function containsError(items) {
  let found = false
  for (const inputState in items) {
    if (items[inputState] === 'error') {
      found = true
    }
  }
  return found
}
