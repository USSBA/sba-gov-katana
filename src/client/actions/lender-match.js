import axios from "axios";
import { browserHistory } from "react-router";
import config from "../services/config.js";

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

export function createIndustryInfo(industryInfoData) {
  return {
    type: "CREATE_INDUSTRY_INFO",
    industryInfoData: industryInfoData
  };
}

export function createLoan(loanData) {
  return {
    type: "CREATE_LOAN",
    loanData: loanData
  };
}

export function matchFormData(reviewSubmitInfoData) {
  return function(dispatch) {
    dispatch({
      type: "MATCH_FORM_DATA_START"
    });
    axios.post(config.routes.submitForm, reviewSubmitInfoData)
      .then((response) => {
        dispatch({
          type: "MATCH_FORM_DATA_SUCCESS",
          payload: response.data
        });
        browserHistory.push("/linc/success");
      })
      .catch((error) => {
        dispatch({
          type: "MATCH_FORM_DATA_ERROR",
          payload: error
        });
      });
  };
}
