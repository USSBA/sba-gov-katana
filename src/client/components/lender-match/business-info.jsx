import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js'
import { browserHistory } from 'react-router';
import { FormPanel } from '../common/form-styling.jsx'
import { getTextAlphanumeicValidationState, getZipcodeValidationState, getWebsiteValidationState } from '../helpers/page-validator-helpers.jsx'
import styles from '../../styles/lender-match/lender-match.scss';
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
    browserHistory.push('/linc/form/industry');
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
      <FormPanel title="Tell us about your business" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
        <form ref={ (input) => this.businessInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <TextInput label="What is the name of your business?" name="businessInfoName" handleChange={ this.handleChange.bind(this) } value={ this.state.businessInfoFields.businessInfoName } getValidationState={ this.state.validStates["businessInfoName"] }
            autoFocus required />
          <TextInput label="What is the business ZIP code?" name="businessInfoZipcode" handleChange={ this.handleZipcodeChange.bind(this) } value={ this.state.businessInfoFields.businessInfoZipcode } getValidationState={ this.state.validStates["businessInfoZipcode"] }
            maxLength="5" required />
          <TextInput label="What is your business website?" name="businessInfoWebsite" handleChange={ this.handleChange.bind(this) } value={ this.state.businessInfoFields.businessInfoWebsite } getValidationState={ this.state.validStates["businessInfoWebsite"] }
            placeholder="Optional" />
          <TextArea label="Describe what your business does" name="businessInfoDescription" handleChange={ this.handleChange.bind(this) } value={ this.state.businessInfoFields.businessInfoDescription } getValidationState={ this.state.validStates["businessInfoDescription"] }
            required />
          <Col md={ 6 } mdOffset={ 3 }>
          <button className={ styles.continueBtn } type="submit" disabled={ !(this.isValidForm()) }> Continue </button>
          </Col>
        </form>
      </FormPanel>
      );
  }
  ;
}

function mapStateToProps(state) {
  return {
    businessInfoFields: state.businessInfoReducer.businessInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BusinessInfoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInfoForm);
