import config from "config";
import { getEndPointUrl, convertFormDataToXml, createLincSoapRequestEnvelopeXml, sendLincSoapRequest } from "./linc-soap-request.js";
import lenderMatchRegistration from "../models/lender-match-registration.js";
import lenderMatchSoapResponse from "../models/lender-match-soap-response.js";
import EmailConfirmation from "../models/email-confirmation.js";

import moment from "moment";


function createLenderMatchSoapResponseData(data) {
  return lenderMatchSoapResponse.create(data);
}

function updateLenderMatchSoapResponse(lenderMatchRegistrationId) {
  const now = moment();
  return lenderMatchSoapResponse.update({
    processed: now.unix()
  }, {
    where: {
      lenderMatchRegistrationId: lenderMatchRegistrationId
    }
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log("EXCEPTION: Problem updating lenderMatchSoapResponse.");
      throw err;
    });
}


function deleteLenderMatchRegistration(lenderMatchRegistrationId) {
  return EmailConfirmation.destroy({
    where: {
      lenderMatchRegistrationId: lenderMatchRegistrationId
    }
  })
    .then(function() {
      return lenderMatchSoapResponse.destroy({
        where: {
          lenderMatchRegistrationId: lenderMatchRegistrationId
        }
      });
    })
    .then(function() {
      return lenderMatchRegistration.destroy({
        where: {
          id: lenderMatchRegistrationId
        }
      });
    })
    .catch((err) => {
      console.log("EXCEPTION: Problem deleting lenderMatchRegistration.");
      throw err;
    });
}




function handleSoapResponse(soapResponse) {
  let retVal;
  if (soapResponse.responseCode === "P" || soapResponse.responseCode === "F") {
    retVal = createLenderMatchSoapResponseData(soapResponse);
  } else if (soapResponse.responseCode === "S") {
    retVal = deleteLenderMatchRegistration(soapResponse.lenderMatchRegistrationId);
  } else { //eslint-disable-line no-else-return
    console.log("EXCEPTION: Unknown Response Code received from OCA.");
    throw new Error("Unknown Response Code receieved from OCA.");
  }
  return retVal;
}

function sendDataToOca(lenderMatchRegistrationData) {
  const soapRequestData = {
    userName: config.get("oca.soap.username"),
    password: config.get("oca.soap.password"),
    ocaSoapWsdl: config.get("oca.soap.wsdlUrl"),
    lenderMatchRegistration: lenderMatchRegistrationData
  };
  return getEndPointUrl(soapRequestData)
    .then(convertFormDataToXml)
    .then(createLincSoapRequestEnvelopeXml)
    .then(sendLincSoapRequest)
    .then(handleSoapResponse)
    .catch(console.error);
}

export { sendDataToOca, handleSoapResponse };
