import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, TextArea, SelectBox, MultiSelectBox } from '../helpers/form-helpers.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import { browserHistory } from 'react-router';
import { FormPanel } from '../common/form-styling.jsx'
import { getSelectBoxValidationState } from '../helpers/page-validator-helpers.jsx'
import styles from './lender-match.scss';
import { Col } from 'react-bootstrap';

class IndustryInfoForm extends React.Component {
  constructor(props) {
    super();
    let industryInfoFields = Object.assign({}, {
      industryType: "",
      industryExperience: ""
    }, props.industryInfoFields);
    let validStates = {};
    if (industryInfoFields.industryType) {
      validStates = Object.assign(validStates, this.getValidationState("industryType", industryInfoFields.industryType));
    }
    if (industryInfoFields.industryExperience) {
      validStates = Object.assign(validStates, this.getValidationState("industryExperience", industryInfoFields.industryExperience));
    }
    this.state = {
      industryInfoFields: industryInfoFields,
      validStates: validStates
    };
  }

  isValidForm() {
    let validForm = true;
    for (var inputState in this.state.validStates) {
      if (this.state.validStates[inputState] === "error" || this.state.validStates[inputState] === null) {
        validForm = false;
      }
    }
    return validForm
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createIndustryInfo(this.state.industryInfoFields);
    browserHistory.push('/linc/form/loan');
    this.industryInfoForm.reset()
  }

  handleChange(e) {
    let industryInfoFields = {};
    industryInfoFields[e.target.name] = e.target.value;
    this.setState({
      industryInfoFields: {
        ...this.state.industryInfoFields,
        ...industryInfoFields
      }
    });
    let validStates = this.getValidationState(e.target.name, e.target.value)
    this.setState({
      validStates: {
        ...this.state.validStates,
        ...validStates
      }
    })
  }

  getValidationState(name, value) {
    return getSelectBoxValidationState(name, value)
  }

  handleSelectChange(newValue) {
    let newIndustryInfoFields = _.merge(this.state.industryInfoFields, {
      industryType: newValue
    });
    this.setState({
      industryInfoFields: newIndustryInfoFields
    });
    let validStates = this.getValidationState("industryType", newValue);
    let newValidStates = _.merge(this.state.validStates, validStates);
    this.setState({
      validStates: newValidStates
    });
  }

  render() {
    let industryTypeOptions = _.map([
      "Advertising/Marketing",
      "Agriculture",
      "Automotive/Service Station",
      "Chemical/Pharmaceutical",
      "Construction",
      "Education",
      "Energy",
      "Entertainment/Recreation",
      "Financial Services",
      "Food Services",
      "Health Care",
      "Hospitality",
      "Manufacturing",
      "Media",
      "Non-Profit",
      "Other",
      "Professional Services",
      "Real Estate",
      "Restaurant/Bar",
      "Retail",
      "Technology",
      "Transportation/Logistics"
    ], (x) => {
      return {
        label: x,
        value: x
      };
    });
    ;

    return (
      <div>
        <form ref={ (input) => this.industryInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <MultiSelectBox label="In what industry is your business?" name="industryType" onChange={ this.handleSelectChange.bind(this) } getValidationState={ this.state.validStates["industryType"] } value={ this.state.industryInfoFields.industryType }
            options={ industryTypeOptions } autoFocus required></MultiSelectBox>
          <SelectBox label="This component will get destroyed soon!" name="industryExperience" handleChange={ this.handleChange.bind(this) } getValidationState={ this.state.validStates["industryExperience"] } defaultValue={ this.state.industryInfoFields.industryExperience }
            required>
            <option value="" disabled>- Select use of funds -</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2-5 years">2-5 years</option>
            <option value="5+ years">5+ years</option>
          </SelectBox>
          <button className={ styles.continueBtn } type="submit" disabled={ !(this.isValidForm()) }> CONTINUE </button>
        </form>
      </div>
      );
  }
  ;
}

function mapStateToProps(state) {
  return {
    industryInfoFields: state.lenderMatch.industryInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndustryInfoForm);
