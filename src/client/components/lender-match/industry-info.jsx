import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx';
import MultiSelect from '../atoms/multiselect.jsx';
import RadioButtonGroup from '../atoms/radio.jsx';
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import { FormPanel } from '../common/form-styling.jsx'
import { getSelectBoxValidationState, containsErrorOrNull } from '../helpers/page-validator-helpers.jsx'
import styles from './lender-match.scss';
import _ from "lodash";

class IndustryInfoForm extends React.Component {
  constructor(props) {
    super();
    let initialData = props.industryInfoFields || {};
    this.state = {
      industryType: initialData.industryType || "",
      industryExperience: initialData.industryExperience || "",
      validStates: {
        industryType: null,
        industryExperience: null
      }
    };
  }

  componentDidMount() {
    this.validateForm();
  }

  validateForm() {
    let validStates = {};
    validStates = Object.assign(validStates, getSelectBoxValidationState("industryType", this.state.industryType));
    validStates = Object.assign(validStates, getSelectBoxValidationState("industryExperience", this.state.industryExperience));
    this.setState({
      validStates: validStates
    })
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createIndustryInfo({
      industryType: this.state.industryType,
      industryExperience: this.state.industryExperience
    });
    this.props.locationActions.locationChange('/linc/form/loan', {
      action: "Continue Button Pushed",
      label: "/linc/form/industry"
    });
    this.industryInfoForm.reset();
  }

  handleChange(newValue) {
    this.setState({
      industryExperience: newValue
    }, () => this.validateForm());
  }

  handleSelectChange(newValue) {
    this.setState({
      industryType: newValue
    }, () => this.validateForm());
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

    let radioButtonOptions = [
      {
        value: "Less than 1 year",
        text: "Less than 1 year"
      }, {
        value: "1-2 years",
        text: "1-2 years"
      }, {
        value: "2-5 years",
        text: "2-5 years"
      }, {
        value: "5+ years",
        text: "5+ years"
      }
    ];

    return (
      <div>
        <form ref={ (form) => this.industryInfoForm = form } onSubmit={ (e) => this.handleSubmit(e) }>
          <MultiSelect label="In what industry is your business?" name="industryType" onChange={ this.handleSelectChange.bind(this) } getValidationState={ this.state.validStates.industryType } value={ this.state.industryType }
            options={ industryTypeOptions } autoFocus maxValues={ 3 }></MultiSelect>
          <RadioButtonGroup label="How much experience do you have?" name="industryExperience" onChange={ this.handleChange.bind(this) } getValidationState={ this.state.validStates.industryExperience } value={ this.state.industryExperience }
            options={ radioButtonOptions }/>
          <button className={ styles.continueBtn } type="submit" disabled={ !(this.isValidForm()) }>
            CONTINUE
          </button>
        </form>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    industryInfoFields: state.lenderMatch.industryInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndustryInfoForm);
