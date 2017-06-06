import config from "config";
import { getEndPointUrl, convertFormDataToXml, createSoapEnvelope, sendLincSoapRequest, createSoapEnvelopeForPasswordUpdate } from "./oca-soap-client.js";
import lenderMatchRegistration from "../models/lender-match-registration.js";
import lenderMatchSoapResponse from "../models/lender-match-soap-response.js";
import emailConfirmation from "../models/email-confirmation.js";
import lincPasswordUpdate from "../models/linc-password-update.js";

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

function generatePassword(length) {
  const chars = "abcdefghkmnpqrstuvwxyzABCDEFGHKMNPQRSTUVWXYZ23456789!$#%";
  return _.sampleSize(chars, length).join("");
}

function updateLincPassword(updateInfo, newPassword) {
  const newExpiry = moment().add(updateInfo.schedule * 60).unix(); //eslint-disable-line no-magic-numbers
  return lincPasswordUpdate.update(
    {
      expiry: newExpiry,
      password: newPassword
    },
    {
      where: {
        id: updateInfo.id
      }
    })
    .catch((err) => {
      console.log("EXCEPTION: Problem updating lincPasswordUpdate table.");
      throw err;
    });
}

function sendPasswordUpdateToOca(userName, password, newPassword) {
  const passwordUpdateSoapEnvelope = createSoapEnvelopeForPasswordUpdate(userName, password, newPassword);
  return getEndPointUrl(config.get("oca.soap.wsdlUrl"))
    .then(function(endpoint) {
      return sendLincSoapRequest(endpoint, passwordUpdateSoapEnvelope, false);
    });
}

function sendPasswordUpdateRequest() {
  return lincPasswordUpdate.findOne()
    .then((response) => {
      if (moment().unix() >= response.expiry) {
        const newPassword = generatePassword(12); //eslint-disable-line no-magic-numbers
        return sendPasswordUpdateToOca(response.username, response.password, newPassword).then((result) => {
          if (result.responseCode === "0" && result.comment === "Password changed.") { //eslint-disable-line no-magic-numbers
            return updateLincPassword(response, newPassword);
          }
          console.log("Unable to reset or update OCA password.");
          return Promise.reject("Unable to reset or update OCA password.");
        });
      }
      return Promise.resolve(null);
    })
    .catch((error) => {
      console.log("EXCEPTION: Error building Password Update Request.");
      throw error;
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
      return sendLincSoapRequest(endpoint, soapEnvelope, true);
    })
    .then(function(response) {
      return _.merge({}, response, {
        lenderMatchRegistrationId: lenderMatchRegistrationData.id
      });
    });
  return Promise.resolve(promise); // wrap in a bluebird promise
}



export { sendDataToOca, handleSoapResponse, sendPasswordUpdateRequest };
