import axios from "axios";
import {
  formatMessage
} from "../service/linc-message-formatter.js";
const request = require("request");
const xmlToJs = require("xml2js");
const DOMParser = require("xmldom").DOMParser; // eslint-disable-line id-match
const XmlSerializer = require("xmldom").XMLSerializer; // eslint-disable-line id-match
import config from "config";
import _ from "lodash";


function getEndPointFromXml(response) {
  let responseData = response.data;
  const parser = new DOMParser();
  const xmlRespDoc = parser.parseFromString(responseData);
  let targetNode = xmlRespDoc.getElementsByTagName("wsdlsoap:address")[0];
  let location = targetNode.getAttribute("location");
  return location;
}

function getEndPointUrl(wsdlUrl) {
  return axios.get(wsdlUrl)
    .then(getEndPointFromXml)
    .catch(function(error) {
      console.error("EXCEPTION: Unable to get Endpoint from WSDL file!");
      throw error;
    });
}

function convertFormDataToXml(userInfo, lenderMatchRegistration) {
  const objFormData = {
    "LINC_APP": {
      "SBA_LINC_ENQ": formatMessage(userInfo, lenderMatchRegistration),
      "$": {
        "version": config.get("linc.ocaVersion")
      }
    }
  };

  const builder = new xmlToJs.Builder({
    "headless": true
  });

  return builder.buildObject(objFormData);
}

function createSoapEnvelope(userName, password, bodyData) {
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
  const valueUsername = xmlDoc.createTextNode(userName);
  firstItemValue.appendChild(valueUsername);
  const secondItemKey = xmlDoc.createElement("x-:key");
  const secondItemValue = xmlDoc.createElement("x-:value");
  secondItem.appendChild(secondItemKey);
  secondItem.appendChild(secondItemValue);
  const keyPassword = xmlDoc.createTextNode("password");
  secondItemKey.appendChild(keyPassword);
  const valuePassword = xmlDoc.createTextNode(password);
  secondItemValue.appendChild(valuePassword);
  const thirdItemKey = xmlDoc.createElement("x-:key");
  const thirdItemValue = xmlDoc.createElement("x-:value");
  thirdItem.appendChild(thirdItemKey);
  thirdItem.appendChild(thirdItemValue);
  const keySbaLinc = xmlDoc.createTextNode("SBA_LINC");
  thirdItemKey.appendChild(keySbaLinc);
  const wrappedSbaLinc = xmlDoc.createCDATASection(bodyData);
  thirdItemValue.appendChild(wrappedSbaLinc);
  const domSerializer = new XmlSerializer();
  return domSerializer.serializeToString(xmlDoc);
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

function sendLincSoapRequest(endpoint, bodyXML) {

  // console.log("Sending Data to OCA", bodyXML);

  return new Promise((resolve, reject) => {

    const options = {
      uri: endpoint,
      method: "POST",
      followAllRedirects: true,
      followOriginalHttpMethod: true,
      body: bodyXML,
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
        reject(error);
      } else {
        // console.log("Receiving Data from OCA", body);
        const resp = parseResponse(body);
        resolve(resp);
      }
    });
  });
}



export {
  getEndPointUrl,
  convertFormDataToXml,
  createSoapEnvelope,
  sendLincSoapRequest
};
