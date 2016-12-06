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
    if (e.target.value.length <= 10 && e.target.value.length >= 7 && numberRegex.test(e.target.value)){
        validStates[e.target.name] = "success";
    } else if (e.target.value.length < 7 && numberRegex.test(e.target.value)) {
        validStates[e.target.name] = null;
    } else {
        validStates[e.target.name] = "error";
    }
    return validStates
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
    return validStates
}