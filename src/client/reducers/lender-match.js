const lenderMatchReducer = (state = {}, action) => {
  if (action.type === 'REVIEW_ANSWERS') {
    return Object.assign({}, state, {
      additionalInfoData: action.additionalInfoData
    })
  } else if (action.type === 'CREATE_BUSINESS_INFO') {
    return Object.assign({}, state, {
      businessInfoData: action.businessInfoData
    })
  } else if (action.type === 'CREATE_CONTACT_INFO') {
    return Object.assign({}, state, {
      contactInfoData: action.contactInfoData
    })
  } else if (action.type === 'CREATE_INDUSTRY_INFO') {
    return Object.assign({}, state, {
      industryInfoData: action.industryInfoData
    })
  } else if (action.type === 'CREATE_LOAN') {
    return Object.assign({}, state, {
      loanData: action.loanData
    })
  }
  return state
}

export default lenderMatchReducer
