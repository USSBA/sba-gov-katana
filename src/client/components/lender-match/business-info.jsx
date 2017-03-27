import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import { FormPanel } from '../common/form-styling.jsx'
import { getTextAlphanumeicValidationState, getZipcodeValidationState, getWebsiteValidationState } from '../helpers/page-validator-helpers.jsx'
import styles from './lender-match.scss';
import { Col } from 'react-bootstrap';



class BusinessInfoForm extends React.Component {
  static requiredFields =["businessInfoName", "businessInfoZipcode", "businessInfoDescription"]

  constructor(props) {
    super();
    let businessInfoFields = Object.assign({}, {
      businessInfoName: "",
      businessInfoZipcode: "",
      businessInfoDescription: "",
      businessInfoWebsite: ""
    }, props.businessInfoFields);
    let validStates = {};
    validStates = Object.assign(validStates, this.getValidationState("businessInfoName", businessInfoFields.businessInfoName));
    validStates = Object.assign(validStates, this.getValidationState("businessInfoZipcode", businessInfoFields.businessInfoZipcode));
    validStates = Object.assign(validStates, this.getValidationState("businessInfoDescription", businessInfoFields.businessInfoDescription));
    validStates = Object.assign(validStates, this.getValidationState("businessInfoWebsite", businessInfoFields.businessInfoWebsite));
    this.state = {
      businessInfoFields: businessInfoFields,
      validStates: validStates
    };
  }

  isValidForm() {
    let validForm = true;
    for (var fieldName in this.state.validStates) {
      if (BusinessInfoForm.requiredFields.indexOf(fieldName) !== -1) {
        if (this.state.validStates[fieldName] === "error" || this.state.validStates[fieldName] === null) {
          validForm = false;
        }
      }
    }
    return validForm
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createBusinessInfo(this.state.businessInfoFields);
    this.props.locationActions.locationChange('/linc/form/industry');
    this.businessInfoForm.reset();
  }

  handleChange(e) {
    let businessInfoFields = {};
    businessInfoFields[e.target.name] = e.target.value;
    this.setState({
      businessInfoFields: {
        ...this.state.businessInfoFields,
        ...businessInfoFields
      }
    });
    let validStates = this.getValidationState(e.target.name, e.target.value);
    this.setState({
      validStates: {
        ...this.state.validStates,
        ...validStates
      }
    });
  }

  handleZipcodeChange(e) {
    let businessInfoFields = {};
    let zipcode = e.target.value.replace(/[\D]/g, "");
    if (zipcode.length <= 5) {
      businessInfoFields[e.target.name] = zipcode;
      this.setState({
        businessInfoFields: {
          ...this.state.businessInfoFields,
          ...businessInfoFields
        }
      });
      let validStates = this.getValidationState(e.target.name, e.target.value);
      this.setState({
        validStates: {
          ...this.state.validStates,
          ...validStates
        }
      });
    }
  }

  getValidationState(name, value) {
    let validStates = {}
    if (name === "businessInfoName") {
      validStates = getTextAlphanumeicValidationState(name, value);
    } else if (name === "businessInfoZipcode") {
      validStates = getZipcodeValidationState(name, value);
    } else if (name === "businessInfoDescription") {
      validStates = getTextAlphanumeicValidationState(name, value);
    } else if (name === "businessInfoWebsite") {
      validStates = getWebsiteValidationState(name, value);
    }
    return validStates;
  }

  render() {
    return (
      <div>
        <form ref={ (input) => this.businessInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <TextInput label="What is the name of your business?" name="businessInfoName" handleChange={ this.handleChange.bind(this) } value={ this.state.businessInfoFields.businessInfoName } getValidationState={ this.state.validStates["businessInfoName"] }
            autoFocus required />
          <TextInput label="What is the business ZIP code?" name="businessInfoZipcode" handleChange={ this.handleZipcodeChange.bind(this) } value={ this.state.businessInfoFields.businessInfoZipcode } getValidationState={ this.state.validStates["businessInfoZipcode"] }
            maxLength="5" required />
          <TextInput label="What is your business website?" name="businessInfoWebsite" handleChange={ this.handleChange.bind(this) } value={ this.state.businessInfoFields.businessInfoWebsite } getValidationState={ this.state.validStates["businessInfoWebsite"] }
            placeholder="Optional" />
          <TextArea label="Describe what your business does" name="businessInfoDescription" handleChange={ this.handleChange.bind(this) } value={ this.state.businessInfoFields.businessInfoDescription } getValidationState={ this.state.validStates["businessInfoDescription"] }
            placeholder="My neighborhood pizza restaurant specializes in serving fast cuisine made with high-quality, local ingredients..." required />
          <button className={ styles.continueBtn } type="submit" disabled={ !(this.isValidForm()) }> CONTINUE </button>
        </form>
      </div>
      );
  }
  ;
}

function mapStateToProps(state) {
  return {
    businessInfoFields: state.lenderMatch.businessInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInfoForm);
