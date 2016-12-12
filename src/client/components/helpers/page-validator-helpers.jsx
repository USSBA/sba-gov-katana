import React from 'react'

export function getNameValidationState(e) {
    let validStates = {};
    var nameRegex = new RegExp(/^[a-z ,.'-]+$/i)
    if (nameRegex.test(e.target.value)) {
        validStates[e.target.name] = "success";
    } else if (e.target.value.length === 0) {
        validStates[e.target.name] = null;
    } else {
        validStates[e.target.name] = "error";
    }
    return validStates
}

export function getPhoneValidationState(e) {
    let validStates = {};
    var numberRegex = new RegExp(/^\d+$/)
    if (e.target.value.length >= 10 && numberRegex.test(e.target.value)){
        validStates[e.target.name] = "success";
    } else {
        validStates[e.target.name] = null;
    }
    return validStates;
}

export function getEmailValidationState(e) {
    let validStates ={};
    var emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

    if (emailRegex.test(e.target.value)) {
        validStates[e.target.name] = "success";
    } else if (e.target.value.length === 0) {
        validStates[e.target.name] = null;
    } else if ((/[!#$%&’*+/=?^_`{|}~]/).test(e.target.value)) {
        validStates[e.target.name] = "error";
    }
    return validStates;
}

export function getTextAlphanumeicValidationState(e){
    let validStates = {};
    if (e.target.value.length > 0){
        validStates[e.target.name] = "success";
    } else {
        validStates[e.target.name] = "error"
    }
    return validStates;
}

export function getZipcodeValidationState(e) {
    let validStates = {};
    var numberRegex = new RegExp(/^\d+$/)
    if (e.target.value.length === 5 && numberRegex.test(e.target.value)){
        validStates[e.target.name] = "success";
    } else {
        validStates[e.target.name] = null;
    }
    return validStates;
}

export function getWebsiteValidationState(e) {
    let optionalStates = {};
    var websiteRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
    if (websiteRegex.test(e.target.value)) {
        optionalStates[e.target.name] = "success"
    } else {
        optionalStates[e.target.name] = null
    }
    return optionalStates;
}

export function getSelectBoxValidationState(e) {
    let validStates = {};
    if (e.target.value != null){
        validStates[e.target.name] = "success"
    } else {
        validStates[e.target.name] = null
    }
    return validStates
}

export function getCurrencyValidationState(e) {
    let validStates = {};
    if (e.target.value.length > 0){
        validStates[e.target.name] = "success"
    } else {
        validStates[e.target.name] = null
    }
    return validStates
}

export function getAlwaysValidValidationState(e){
    let validStates = {};
    validStates[e.target.name] = "success";
    return validStates;
}
