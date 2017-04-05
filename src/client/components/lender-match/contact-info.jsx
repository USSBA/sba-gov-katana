import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../atoms/text-input.jsx';
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import {getNameValidationState, getPhoneValidationState, getEmailValidationState, getAlwaysValidValidationState, containsErrorOrNull} from '../../services/page-validator-helpers.js';
import styles from './lender-match.scss';
import clientConfig from "../../services/config.js";
import {includes} from 'lodash';
import {logEvent} from "../../services/analytics.js";

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
      if(validationState[name] === "error"){
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
    return (
      <div>
        <form id="lender-match-contact-form" ref={(input) => this.contactInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
          <TextInput id="lender-match-name" errorText={clientConfig.messages.validation.invalidName} label="What is your full name?" name="contactFullName" handleChange={this.handleChange.bind(this)} value={this.state.contactFullName} getValidationState={this.state.validStates.contactFullName} autoFocus onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
          <TextInput id="lender-match-phone" errorText={clientConfig.messages.validation.invalidPhoneNumber} label="What is your phone number?" name="contactPhoneNumber" handleChange={this.handleChange.bind(this)} value={this.state.contactPhoneNumber} getValidationState={this.state.validStates.contactPhoneNumber} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
          <TextInput id="lender-match-email" errorText={clientConfig.messages.validation.invalidEmail} label="What is your email address?" name="contactEmailAddress" handleChange={this.handleChange.bind(this)} value={this.state.contactEmailAddress} getValidationState={this.state.validStates.contactEmailAddress} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/> {/* HoneyPot -- this comment should not appear in the minified code*/}
          <TextInput id="lender-match-email-check" hidden={true} label="What is your second email address?" name="contactSecondaryEmailAddress" tabIndex={-1} handleChange={this.handleChange.bind(this)} getValidationState={this.state.validStates.contactSecondaryEmailAddress}/>
          <button className={styles.continueBtn} type="submit" disabled={!(this.isValidForm())}>
            CONTINUE
          </button>
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
