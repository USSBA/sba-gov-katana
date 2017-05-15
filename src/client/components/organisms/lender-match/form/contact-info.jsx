import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {includes} from 'lodash';

import * as LenderMatchActions from '../../../../actions/lender-match.js';
import * as LocationChangeActions from '../../../../actions/location-change.js';
import constants from "../../../../services/constants.js";
import {logEvent} from "../../../../services/analytics.js";
import {getNameValidationState, getPhoneValidationState, getEmailValidationState, getAlwaysValidValidationState, containsErrorOrNull} from '../../../../services/page-validator-helpers.js';

import TextInput from '../../../atoms/text-input/text-input.jsx';
import FormPageButtons from '../../../molecules/form-page-buttons/form-page-buttons.jsx';
import styles from './lender-match.scss';

class ContactInfoForm extends React.Component {
  constructor(props) {
    super();
    let initialData = props.contactInfoFields || {};
    this.state = {
      contactFullName: initialData.contactFullName || "",
      contactPhoneNumber: initialData.contactPhoneNumber || "",
      contactEmailAddress: initialData.contactEmailAddress || "",
      validStates: {
        contactFullName: null,
        contactPhoneNumber: null,
        contactEmailAddress: null
      }
    };
  }

  componentDidMount() {
    this.validateFields(["contactPhoneNumber", "contactFullName", "contactEmailAddress", "contactSecondaryEmailAddress"]);
    window.scrollTo(0, 0);
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    let validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null);
    if (validationState[name] === "error") {
      logEvent({"category": "Lender Match Form", "action": "Error Event", "label": name});
    }
    return validationState;
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates;
    if (includes(fields, "contactFullName")) {
      validStates = Object.assign(validStates, this.validateSingleField(getNameValidationState, "contactFullName", defaultWhenNotSuccessful));
    }
    if (includes(fields, "contactPhoneNumber")) {
      validStates = Object.assign(validStates, this.validateSingleField(getPhoneValidationState, "contactPhoneNumber", defaultWhenNotSuccessful));
    }
    if (includes(fields, "contactEmailAddress")) {
      validStates = Object.assign(validStates, this.validateSingleField(getEmailValidationState, "contactEmailAddress", defaultWhenNotSuccessful));
    }
    if (includes(fields, "contactSecondaryEmailAddress")) {
      validStates = Object.assign(validStates, this.validateSingleField(getAlwaysValidValidationState, "contactSecondaryEmailAddress", defaultWhenNotSuccessful));
    }
    this.setState({validStates: validStates})
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createContactInfo({contactPhoneNumber: this.state.contactPhoneNumber, contactFullName: this.state.contactFullName, contactEmailAddress: this.state.contactEmailAddress});
    this.props.locationActions.locationChange('/linc/form/business', {
      action: "Continue Button Pushed",
      label: "/linc/form/contact"
    });
    this.contactInfoForm.reset();
  }

  handleChange(e) {
    let newState = {};
    let name = e.target.name;
    let newValue = e.target.value;
    if (name && name === 'contactPhoneNumber') {
      newValue = newValue.replace(/[\D]/g, "");
    }
    newState[name] = newValue;
    this.setState(newState, () => this.validateFields([name]));
  }

  handleBlur(e) {
    this.validateFields([e.target.name], "error");
  }

  handleFocus(nameOrEvent) {
    let name = nameOrEvent && nameOrEvent.target && nameOrEvent.target.name
      ? nameOrEvent.target.name
      : nameOrEvent;
    logEvent({"category": "Lender Match Form", "action": "Focus Event", "label": name});
  }

  render() {
    console.log("this.props.backButtonText", this.props.backButtonText);
    return (
      <div>
        <form id="lender-match-contact-form" ref={(input) => this.contactInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
          <TextInput id="lender-match-name" errorText={constants.messages.validation.invalidName} label="What is your full name?" name="contactFullName" onChange={this.handleChange.bind(this)} value={this.state.contactFullName} validationState={this.state.validStates.contactFullName} autoFocus onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
          <TextInput id="lender-match-phone" errorText={constants.messages.validation.invalidPhoneNumber} label="What is your phone number?" name="contactPhoneNumber" onChange={this.handleChange.bind(this)} value={this.state.contactPhoneNumber} validationState={this.state.validStates.contactPhoneNumber} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
          <TextInput id="lender-match-email" errorText={constants.messages.validation.invalidEmail} label="What is your email address?" name="contactEmailAddress" onChange={this.handleChange.bind(this)} value={this.state.contactEmailAddress} validationState={this.state.validStates.contactEmailAddress} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/> {/* HoneyPot -- this comment should not appear in the minified code*/}
          <TextInput id="lender-match-email-check" hidden={true} label="What is your second email address?" name="contactSecondaryEmailAddress" tabIndex={-1} onChange={this.handleChange.bind(this)} validationState={this.state.validStates.contactSecondaryEmailAddress}/>
          <FormPageButtons backButtonText="EXIT" backButtonHandler={this.props.locationActions.goBack} continueButtonHandler={this.handleSubmit.bind(this)} continueButtonDisabled={!(this.isValidForm())}/>
        </form>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {contactInfoFields: reduxState.lenderMatch.contactInfoData};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  };
}

export {ContactInfoForm};
export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoForm);
