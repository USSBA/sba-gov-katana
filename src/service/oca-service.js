import config from "config";
import { getEndPointUrl, convertFormDataToXml, createSoapEnvelope, sendLincSoapRequest } from "./oca-soap-client.js";
import lenderMatchRegistration from "../models/lender-match-registration.js";
import lenderMatchSoapResponse from "../models/lender-match-soap-response.js";
import emailConfirmation from "../models/email-confirmation.js";

import moment from "moment";
import _ from "lodash";


function createLenderMatchSoapResponseData(data) {
  return lenderMatchSoapResponse.create(data);
}

function updateLenderMatchSoapResponse(lenderMatchRegistrationId) {
  return lenderMatchSoapResponse.update({
    processed: moment().unix()
  }, {
    where: {
      lenderMatchRegistrationId: lenderMatchRegistrationId
    }
  })
    .catch((err) => {
      console.log("EXCEPTION: Problem updating lenderMatchSoapResponse.");
      throw err;
    });
}


function deleteLenderMatchRegistration(lenderMatchRegistrationId) {
  return emailConfirmation.destroy({
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
  if (soapResponse.responseCode === "P" || soapResponse.responseCode === "F") {
    return createLenderMatchSoapResponseData(soapResponse);
  } else if (soapResponse.responseCode === "S") {
    return deleteLenderMatchRegistration(soapResponse.lenderMatchRegistrationId);
  }
  throw new Error("Unknown Response Code receieved from OCA.");
}

function sendDataToOca(lenderMatchRegistrationData) {
  const sbagovUserId = "Username";
  const dataAsXml = convertFormDataToXml(sbagovUserId, lenderMatchRegistrationData);
  const soapEnvelope = createSoapEnvelope(config.get("oca.soap.username"), config.get("oca.soap.password"), dataAsXml);

  const promise = getEndPointUrl(config.get("oca.soap.wsdlUrl"))
    .then(function(endpoint) {
      return sendLincSoapRequest(endpoint, soapEnvelope);
    })
    .then(function(response) {
      return _.merge({}, response, {
        lenderMatchRegistrationId: lenderMatchRegistrationData.id
      });
    });
  return Promise.resolve(promise); // wrap in a bluebird promise
}

export { sendDataToOca, handleSoapResponse };
