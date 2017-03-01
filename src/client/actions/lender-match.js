export function createBusinessInfo(businessInfoData) {
  return {
    type: "CREATE_BUSINESS_INFO",
    businessInfoData: businessInfoData
  };
}

export function reviewAnswers(additionalInfoData) {
  return {
    type: "REVIEW_ANSWERS",
    additionalInfoData: additionalInfoData
  };
}

export function createContactInfo(contactInfoData) {
  return {
    type: "CREATE_CONTACT_INFO",
    contactInfoData: contactInfoData
  };
}
