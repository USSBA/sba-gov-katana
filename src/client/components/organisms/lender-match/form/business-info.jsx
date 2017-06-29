import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {includes, pick} from 'lodash';

import * as LenderMatchActions from '../../../../actions/lender-match.js';
import * as LocationChangeActions from '../../../../actions/location-change.js';
import {getTextAlphanumeicValidationState, getZipcodeValidationState, getWebsiteValidationState, containsErrorOrNull, containsError} from '../../../../services/page-validator-helpers.js';
import constants from "../../../../services/constants.js";
import {logEvent} from "../../../../services/analytics.js";

import styles from './lender-match.scss';
import TextInput from '../../../atoms/text-input/text-input.jsx';
import FormPageButtons from '../../../molecules/form-page-buttons/form-page-buttons.jsx';
import TextArea from "../../../atoms/textarea/textarea.jsx";

class BusinessInfoForm extends React.Component {
  static requiredFields = ["businessInfoName", "businessInfoZipcode", "businessInfoDescription"]

  constructor(props) {
    super();
    let initialData = props.businessInfoFields || {};
    this.state = {
      businessInfoName: initialData.businessInfoName || "",
      businessInfoZipcode: initialData.businessInfoZipcode || "",
      businessInfoDescription: initialData.businessInfoDescription || "",
      businessInfoWebsite: initialData.businessInfoWebsite || "",
      validStates: {
        businessInfoName: null,
        businessInfoZipcode: null,
        businessInfoDescription: null,
        businessInfoWebsite: null
      }
    };
  }

  componentDidMount() {
    this.validateFields(["businessInfoName", "businessInfoZipcode", "businessInfoDescription", "businessInfoWebsite"]);
    window.scrollTo(0, 0);
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    // if the value is not required and it is empty, then override the defaultWhenNotSuccessful to null
    let defaultWhenNotSuccessfulOverride = defaultWhenNotSuccessful;
    if (!includes(BusinessInfoForm.requiredFields, name) && (!this.state[name] || this.state[name].length === 0)) {
      defaultWhenNotSuccessfulOverride = null;
    }
    let validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessfulOverride || null);
    if (validationState[name] === "error") {
      logEvent({"category": "Lender Match Form", "action": "Error Event", "label": name});
    }
    return validationState;
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates;
    if (includes(fields, "businessInfoName")) {
      validStates = Object.assign(validStates, this.validateSingleField(getTextAlphanumeicValidationState, "businessInfoName", defaultWhenNotSuccessful));
    }
    if (includes(fields, "businessInfoZipcode")) {
      validStates = Object.assign(validStates, this.validateSingleField(getZipcodeValidationState, "businessInfoZipcode", defaultWhenNotSuccessful));
    }
    if (includes(fields, "businessInfoDescription")) {
      validStates = Object.assign(validStates, this.validateSingleField(getTextAlphanumeicValidationState, "businessInfoDescription", defaultWhenNotSuccessful));
    }
    if (includes(fields, "businessInfoWebsite")) {
      validStates = Object.assign(validStates, this.validateSingleField(getWebsiteValidationState, "businessInfoWebsite", defaultWhenNotSuccessful));
    }
    this.setState({validStates: validStates})
  }

  isValidForm() {
    return !containsErrorOrNull(pick(this.state.validStates, BusinessInfoForm.requiredFields)) && !containsError(pick(this.state.validStates, ["businessInfoWebsite"]));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createBusinessInfo(pick(this.state, ["businessInfoName", "businessInfoZipcode", "businessInfoDescription", "businessInfoWebsite"]));
    this.props.locationActions.locationChange('/linc/form/industry', {
      action: "Continue Button Pushed",
      label: "/linc/form/business"
    });
    this.businessInfoForm.reset();
  }

  handleChange(e) {
    let newState = {};
    let name = e.target.name;
    let newValue = e.target.value;
    if (name && name === 'businessInfoZipcode' && newValue) {
      newValue = newValue.replace(/[\D]/g, "");
      newValue = newValue.substring(0, 5);
    }
    if ((name === "businessInfoDescription") && newValue && newValue.length > 250) {
      newValue = newValue.substring(0, 250);
    }
    newState[name] = newValue;

    this.setState(newState, () => this.validateFields([name]));
  }

  handleBlur(e) {
    let name = e.target.name;
    this.validateFields([name], "error");
  }

  handleFocus(nameOrEvent) {
    let name = nameOrEvent && nameOrEvent.target && nameOrEvent.target.name
      ? nameOrEvent.target.name
      : nameOrEvent;
    logEvent({"category": "Lender Match Form", "action": "Focus Event", "label": name});
  }

  render() {
    let id = "business-info-form";
    return (
      <div>
        <form ref={(input) => this.businessInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
          <TextInput label="What is the name of your business?" name="businessInfoName" onChange={this.handleChange.bind(this)} value={this.state.businessInfoName} validationState={this.state.validStates["businessInfoName"]} autoFocus onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
          <TextInput label="What is the business ZIP code?" name="businessInfoZipcode" onChange={this.handleChange.bind(this)} value={this.state.businessInfoZipcode} validationState={this.state.validStates["businessInfoZipcode"]} maxLength="5" onBlur={this.handleBlur.bind(this)} errorText={constants.messages.validation.invalidZip} onFocus={this.handleFocus.bind(this)}/>
          <TextInput label="What is your business website?" name="businessInfoWebsite" onChange={this.handleChange.bind(this)} value={this.state.businessInfoWebsite} validationState={this.state.validStates["businessInfoWebsite"]} placeholder="Optional" onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
          <TextArea label="Describe what your business does" name="businessInfoDescription" onChange={this.handleChange.bind(this)} value={this.state.businessInfoDescription} validationState={this.state.validStates["businessInfoDescription"]} placeholder="My neighborhood pizza restaurant specializes in serving fast cuisine made with high-quality, local ingredients..." onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
          <FormPageButtons backButtonHandler={this.props.locationActions.goBack} continueButtonHandler={this.handleSubmit.bind(this)} continueButtonDisabled={!(this.isValidForm())}/>
        </form>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {businessInfoFields: state.lenderMatch.businessInfoData};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessInfoForm);
