import React from 'react'

export function getNameValidationState(e) {
    let errors = {};
    var nameRegex = new RegExp(/^[a-z ,.'-]+$/i)
    if (nameRegex.test(e.target.value)) {
        errors[e.target.name] = "success";
    } else if (e.target.value.length === 0) {
        errors[e.target.name] = null;
    } else {
        errors[e.target.name] = "error";
    }
    return errors
}

export function getPhoneValidationState(e) {
    let errors = {};
    var numberRegex = new RegExp(/^\d+$/)
    if (e.target.value.length <= 10 && e.target.value.length >= 7 && numberRegex.test(e.target.value)){
        errors[e.target.name] = "success";
    } else if (e.target.value.length < 7 && numberRegex.test(e.target.value)) {
        errors[e.target.name] = null;
    } else {
        errors[e.target.name] = "error";
    }
    return errors}

export function getEmailValidationState(e) {
    let errors ={};
    var emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

    if (emailRegex.test(e.target.value)) {
        errors[e.target.name] = "success";
    } else if (e.target.value.length === 0) {
        errors[e.target.name] = null;
    } else if ((/[!#$%&’*+/=?^_`{|}~]/).test(e.target.value)) {
        errors[e.target.name] = "error";
    }
    return errors
}