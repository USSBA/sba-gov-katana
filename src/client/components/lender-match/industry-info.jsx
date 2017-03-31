import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiSelect from '../atoms/multiselect.jsx';
import RadioButtonGroup from '../atoms/radio.jsx';
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import {getSelectBoxValidationState, containsErrorOrNull} from '../../services/page-validator-helpers.js';
import styles from './lender-match.scss';
import {includes, map} from "lodash";
import clientConfig from "../../services/config.js";

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
    this.validateFields(["industryType", "industryExperience"]);
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    return validationFunction(name, this.state[name], defaultWhenNotSuccessful || null);
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates;
    if (includes(fields, "industryType")) {
      validStates = Object.assign(validStates, this.validateSingleField(getSelectBoxValidationState, "industryType", defaultWhenNotSuccessful));
    }
    if (includes(fields, "industryExperience")) {
      validStates = Object.assign(validStates, this.validateSingleField(getSelectBoxValidationState, "industryExperience", defaultWhenNotSuccessful));
    }
    
    this.setState({validStates: validStates});
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createIndustryInfo({industryType: this.state.industryType, industryExperience: this.state.industryExperience});
    this.props.locationActions.locationChange('/linc/form/loan', {
      action: "Continue Button Pushed",
      label: "/linc/form/industry"
    });
    this.industryInfoForm.reset();
  }

  handleChange(newValue) {
    this.setState({
      industryExperience: newValue
    }, () => this.validateFields(["industryExperience"]));
  }

  handleSelectChange(newValue) {
    this.setState({
      industryType: newValue
    }, () => this.validateFields(["industryType"]));
  }

  handleIndustryTypeBlur() {
    this.validateFields(["industryType"], "error");
  }

  handleIndustryExperienceBlur(){
    this.validateFields(["industryExperience"], "error");
  }

  render() {
    let industryTypeOptions = map([
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
      return {label: x, value: x};
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
        <form ref={(form) => this.industryInfoForm = form} onSubmit={(e) => this.handleSubmit(e)}>
          <MultiSelect errorText={clientConfig.messages.validation.invalidIndustry} label="In what industry is your business?" name="industryType" onChange={this.handleSelectChange.bind(this)} validationState={this.state.validStates.industryType} value={this.state.industryType} options={industryTypeOptions} onBlur={this.handleIndustryTypeBlur.bind(this)} autoFocus maxValues={3}></MultiSelect>
          <RadioButtonGroup errorText={clientConfig.messages.validation.invalidIndustryExperience} label="How much experience do you have?" name="industryExperience" onChange={this.handleChange.bind(this)} validationState={this.state.validStates.industryExperience} value={this.state.industryExperience} options={radioButtonOptions} onBlur={this.handleIndustryExperienceBlur.bind(this)}/>
          <button className={styles.continueBtn} type="submit" disabled={!(this.isValidForm())}>
            CONTINUE
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {industryInfoFields: state.lenderMatch.industryInfoData};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndustryInfoForm);
