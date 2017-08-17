import config from "config";
import { getEndPointUrl, convertFormDataToXml, createSoapEnvelope, sendLincSoapRequest, createSoapEnvelopeForPasswordUpdate } from "./oca-soap-client.js";
import lenderMatchRegistration from "../models/lender-match-registration.js";
import lenderMatchSoapResponse from "../models/lender-match-soap-response.js";
import emailConfirmation from "../models/email-confirmation.js";
import lincPasswordUpdate from "../models/linc-password-update.js";
import { generateOcaPassword, decryptPassword, encryptPassword } from "../util/password-manager.js";

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


function updateLincPassword(updateInfo, newPassword) {
  const newExpiry = moment().add(updateInfo.schedule * 60, "seconds").unix(); //eslint-disable-line no-magic-numbers
  return lincPasswordUpdate.update({
    expiry: newExpiry,
    password: newPassword,
    encrypted: true
  }, {
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
      if (response) {
        if (moment().unix() >= response.expiry) {
          const newPassword = encryptPassword(generateOcaPassword());
          return sendPasswordUpdateToOca(response.username, response.password, newPassword).then((result) => {
            if (result.responseCode === "0" && result.comment === "Password changed.") { //eslint-disable-line no-magic-numbers
              return updateLincPassword(response, newPassword);
            }
            console.log("Unable to reset or update OCA password.");
            return Promise.reject("Unable to reset or update OCA password.");
          });
        }
        return Promise.resolve(null);
      } else {
        return Promise.reject("No password configuration found");
      }
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

function getCredentials() {
  return lincPasswordUpdate.findOne()
    .then((resp) => {
      if (resp && resp.username && resp.password) {
        const password = resp.encrypted ? decryptPassword(resp.password) : resp.password;
        return {
          username: resp.username,
          password: password
        };
      } else {
        throw new Error("Unable to retrieve Username and Password from database.");
      }
    });
}

function sendDataToOca(lenderMatchRegistrationData) {
  const sbagovUserId = "Username";
  const dataAsXml = convertFormDataToXml(sbagovUserId, lenderMatchRegistrationData);
  console.log("OCA Service Data before SOAP", dataAsXml);
  const promise = getEndPointUrl(config.get("oca.soap.wsdlUrl")) // TODO execute endpoint retrieval and credentials retrieval in parallel
    .then(function(endpoint) {
      return getCredentials()
        .then((credentials) => {
          if (credentials && credentials.username && credentials.password) {
            const soapEnvelope = createSoapEnvelope(credentials.username, credentials.password, dataAsXml);
            return sendLincSoapRequest(endpoint, soapEnvelope, true);
          }
          throw new Error("Unable to retrieve Username and Password from database.");
        });
    })
    .then(function(response) {
      return _.merge({}, response, {
        lenderMatchRegistrationId: lenderMatchRegistrationData.id
      });
    })
    .catch((error) => {
      console.log("Unable to send data to OCA.");
      throw error;
    });
  return Promise.resolve(promise); // wrap in a bluebird promise
}



export { sendDataToOca, handleSoapResponse, sendPasswordUpdateRequest, getCredentials };
