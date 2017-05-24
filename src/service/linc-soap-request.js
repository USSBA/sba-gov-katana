import axios from "axios";
import { formatMessage } from "../service/linc-message-formatter.js";
const request = require("request");
const xmlToJs = require("xml2js");
const DOMParser = require("xmldom").DOMParser; // eslint-disable-line id-match
const XmlSerializer = require("xmldom").XMLSerializer; // eslint-disable-line id-match
import config from "config";
import _ from "lodash";

function convertFormDataToXml(reqData) {

  const messageData = _.merge({}, reqData, {
    dbUserID: 1,
    submissionID: 1,
    sbaGovUser: "newUser"
  });

  const objFormData = {
    "LINC_APP": {
      "SBA_LINC_ENQ": formatMessage(messageData),
      "$version": config.get("linc.ocaVersion")
    }
  };

  const builder = new xmlToJs.Builder({
    "headless": true
  });

  reqData.formDataXml = builder.buildObject(objFormData); // eslint-disable-line no-param-reassign
  return reqData;
}

function parseResponse(xmlBody) {
  let errorMessageTechnical = "";
  let errorMessageEnglish = "";

  let retVal = "F";
  const parser = new DOMParser();
  const xmlRespDoc = parser.parseFromString(xmlBody);
  const passwordUpdateRequired = xmlRespDoc.getElementsByTagName("item")[0].getElementsByTagName("value")[0].childNodes[0].nodeValue;

  //this element can be empty
  const secondItemChildren = xmlRespDoc.getElementsByTagName("item")[1].getElementsByTagName("value")[0].childNodes;
  if (secondItemChildren.length > 0) { // eslint-disable-line no-magic-numbers
    errorMessageEnglish = secondItemChildren[0].nodeValue;
  }
  const response = xmlRespDoc.getElementsByTagName("item")[2].getElementsByTagName("value")[0].childNodes[0].nodeValue;

  //this element can be empty
  const fourthItemChildren = xmlRespDoc.getElementsByTagName("item")[3].getElementsByTagName("value")[0].childNodes;
  if (fourthItemChildren.length > 0) { // eslint-disable-line no-magic-numbers
    errorMessageTechnical = fourthItemChildren[0].nodeValue;
  }
  const responseCode = xmlRespDoc.getElementsByTagName("item")[4].getElementsByTagName("value")[0].childNodes[0].nodeValue;
  console.log(responseCode);
  if (responseCode === "0") {
    const lincRespXmlDoc = parser.parseFromString(response);
    retVal = lincRespXmlDoc.getElementsByTagName("Result")[0].childNodes[0].nodeValue;
  }
  return {
    responseCode: retVal,
    errorMessageEnglish: errorMessageEnglish,
    errorMessageTechnical: errorMessageTechnical
  };
}

function sendLincSoapRequest(reqData) {
  return new Promise((resolve) => {

    const options = {
      uri: reqData.endPointUrl,
      method: "POST",
      followAllRedirects: true,
      followOriginalHttpMethod: true,
      body: reqData.soapRequestXml,
      timeout: 5000,
      secureProtocol: "TLSv1_2_method",
      headers: {
        "Content-Type": "text/xml; charset=UTF-8",
        "SOAPAction": ""
      }
    };
    request(options, (error, response, body) => {
      if (error) {
        console.log("EXCEPTION: Request failure in sendLincSoapRequest! ");
        console.log(error);
      //throw error;
      } else {
        const resp = parseResponse(body);
        resp.lenderMatchRegistrationId = reqData.lenderMatchRegistration.id;
        resolve(resp);
      }
    });
  });
}

function getEndPointFromXml(responseData) {
  const parser = new DOMParser();
  const xmlRespDoc = parser.parseFromString(responseData);
  return xmlRespDoc.getElementsByTagName("wsdlsoap:address")[0].getAttribute("location");
}

function getEndPointUrl(reqData) {
  return new Promise((resolve) => {
    axios.get(reqData.ocaSoapWsdl).then((response) => {
      reqData.endPointUrl = getEndPointFromXml(response.data); // eslint-disable-line no-param-reassign
      resolve(reqData);
    }).catch(function(error) {
      console.log("EXCEPTION: Unable to get Endpoint from WSDL file!");
      throw error;
    });
  });
}

function createLincSoapRequestEnvelopeXml(reqData) {

  const text = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ws=\"http://ws.linc\" xmlns:x-=\"http://xml.apache.org/xml-soap\"></soapenv:Envelope>";
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");
  const envelope = xmlDoc.documentElement;
  const header = xmlDoc.createElement("soapenv:Header");
  const body = xmlDoc.createElement("soapenv:Body");
  envelope.appendChild(header);
  envelope.appendChild(body);
  const firstSbaLinc = xmlDoc.createElement("ws:SBA_LINC");
  body.appendChild(firstSbaLinc);
  const innerSbaLinc = xmlDoc.createElement("ws:SBA_LINC");
  firstSbaLinc.appendChild(innerSbaLinc);
  const firstItem = xmlDoc.createElement("x-:item");
  const secondItem = xmlDoc.createElement("x-:item");
  const thirdItem = xmlDoc.createElement("x-:item");
  innerSbaLinc.appendChild(firstItem);
  innerSbaLinc.appendChild(secondItem);
  innerSbaLinc.appendChild(thirdItem);
  const firstItemKey = xmlDoc.createElement("x-:key");
  const firstItemValue = xmlDoc.createElement("x-:value");
  firstItem.appendChild(firstItemKey);
  firstItem.appendChild(firstItemValue);
  const keyUsername = xmlDoc.createTextNode("username");
  firstItemKey.appendChild(keyUsername);
  const valueUsername = xmlDoc.createTextNode(reqData.userName);
  firstItemValue.appendChild(valueUsername);
  const secondItemKey = xmlDoc.createElement("x-:key");
  const secondItemValue = xmlDoc.createElement("x-:value");
  secondItem.appendChild(secondItemKey);
  secondItem.appendChild(secondItemValue);
  const keyPassword = xmlDoc.createTextNode("password");
  secondItemKey.appendChild(keyPassword);
  const valuePassword = xmlDoc.createTextNode(reqData.password);
  secondItemValue.appendChild(valuePassword);
  const thirdItemKey = xmlDoc.createElement("x-:key");
  const thirdItemValue = xmlDoc.createElement("x-:value");
  thirdItem.appendChild(thirdItemKey);
  thirdItem.appendChild(thirdItemValue);
  const keySbaLinc = xmlDoc.createTextNode("SBA_LINC");
  thirdItemKey.appendChild(keySbaLinc);
  const wrappedSbaLinc = xmlDoc.createCDATASection(reqData.formDataXml);
  thirdItemValue.appendChild(wrappedSbaLinc);
  const domSerializer = new XmlSerializer();
  reqData.soapRequestXml = domSerializer.serializeToString(xmlDoc); // eslint-disable-line no-param-reassign
  return reqData;
}

export { getEndPointUrl, convertFormDataToXml, createLincSoapRequestEnvelopeXml, sendLincSoapRequest };
