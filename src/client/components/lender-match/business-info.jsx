import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TextInput, TextArea, SelectBox} from '../helpers/form-helpers.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import {getTextAlphanumeicValidationState, getZipcodeValidationState, getWebsiteValidationState, containsErrorOrNull, containsError} from '../../services/page-validator-helpers.js';
import styles from './lender-match.scss';
import clientConfig from "../../services/config.js";
import {includes, pick} from 'lodash';

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
    this.validateFields([]);
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {

    // if the value is not required and it is empty, then override the defaultWhenNotSuccessful to null
    let defaultWhenNotSuccessfulOverride = defaultWhenNotSuccessful;
    if (!includes(BusinessInfoForm.requiredFields, name) && (!this.state[name] || this.state[name].length === 0)) {
      defaultWhenNotSuccessfulOverride = null;
    }
    return validationFunction(name, this.state[name], defaultWhenNotSuccessfulOverride || null);
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
      newValue = newValue.substring(0,5);
    }
    if((name === "businessInfoDescription") && newValue && newValue.length > 250){
      newValue = newValue.substring(0,250);
    }
    newState[name] = newValue;

    this.setState(newState, () => this.validateFields([name]));
  }

  handleBlur(e) {
    let name = e.target.name;
    this.validateFields([name], "error");
  }

  render() {
    return (
      <div>
        <form ref={(input) => this.businessInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
          <TextInput label="What is the name of your business?" name="businessInfoName" handleChange={this.handleChange.bind(this)} value={this.state.businessInfoName} getValidationState={this.state.validStates["businessInfoName"]} autoFocus onBlur={this.handleBlur.bind(this)}/>
          <TextInput label="What is the business ZIP code?" name="businessInfoZipcode" handleChange={this.handleChange.bind(this)} value={this.state.businessInfoZipcode} getValidationState={this.state.validStates["businessInfoZipcode"]} maxLength="5" onBlur={this.handleBlur.bind(this)} errorText={clientConfig.messages.validation.invalidZip}/>
          <TextInput label="What is your business website?" name="businessInfoWebsite" handleChange={this.handleChange.bind(this)} value={this.state.businessInfoWebsite} getValidationState={this.state.validStates["businessInfoWebsite"]} placeholder="Optional" onBlur={this.handleBlur.bind(this)}/>
          <TextArea label="Describe what your business does" name="businessInfoDescription" handleChange={this.handleChange.bind(this)} value={this.state.businessInfoDescription} getValidationState={this.state.validStates["businessInfoDescription"]} placeholder="My neighborhood pizza restaurant specializes in serving fast cuisine made with high-quality, local ingredients..." onBlur={this.handleBlur.bind(this)}/>
          <button className={styles.continueBtn} type="submit" disabled={!(this.isValidForm())}>
            CONTINUE
          </button>
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
