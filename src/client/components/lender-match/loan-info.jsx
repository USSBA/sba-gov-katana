import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CurrencyInput, TextArea, SelectBox} from '../helpers/form-helpers.jsx';
import MultiSelectBox from '../atoms/multiselect.jsx';
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import {getSelectBoxValidationState, getCurrencyValidationState, containsErrorOrNull, getTextAlphanumeicValidationState} from '../../services/page-validator-helpers.js'
import styles from './lender-match.scss';
import {includes, map} from "lodash";
import clientConfig from "../../services/config.js";

class LoanInfo extends React.Component {
  constructor(props) {
    super();
    let initialData = props.loanFields || {};
    this.state = {
      loanAmount: initialData.loanAmount || "",
      loanDescription: initialData.loanDescription || "",
      loanUsage: initialData.loanUsage || "",
      validStates: {
        loanAmount: null,
        loanDescription: null,
        loanUsage: null
      }
    };
  }

  componentDidMount() {
    this.validateFields(["loanAmount", "loanDescription", "loanUsage"]);
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    return validationFunction(name, this.state[name], defaultWhenNotSuccessful || null);
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates;
    if (includes(fields, "loanAmount")) {
      validStates = Object.assign(validStates, this.validateSingleField(this.getLoanAmountValidationState, "loanAmount", defaultWhenNotSuccessful));
    }
    if (includes(fields, "loanDescription")) {
      validStates = Object.assign(validStates, this.validateSingleField(getSelectBoxValidationState, "loanDescription", defaultWhenNotSuccessful));
    }
    if (includes(fields, "loanUsage")) {
      validStates = Object.assign(validStates, this.validateSingleField(getTextAlphanumeicValidationState, "loanUsage", defaultWhenNotSuccessful));
    }
    this.setState({validStates: validStates});
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates);
  }

  getLoanAmountValidationState(name, value, defaultWhenNotSuccessful) {
    let validFormat = getCurrencyValidationState(name, value, defaultWhenNotSuccessful);
    let amountWithoutCommas = value.replace(/(\$|,)/g, "");
    let validAmount = Number(amountWithoutCommas) > 499;
    let valid = validFormat[name] === 'success' && validAmount ? "success" : defaultWhenNotSuccessful;
    let newState = {};
    newState[name] = valid;
    return newState;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createLoan({loanAmount: this.state.loanAmount, loanDescription: this.state.loanDescription, loanUsage: this.state.loanUsage});
    this.props.locationActions.locationChange('/linc/form/additional', {
      action: "Continue Button Pushed",
      label: "/linc/form/loan"
    });
    this.loanForm.reset()
  }

  handleSelectChange(newValue) {
    this.setState({
      loanDescription: newValue
    }, () => this.validateFields(["loanDescription"]));
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name && name === "loanDescription" && value && value.length > 250) {
      value = value.substring(0, 250);
    }
    if (name && name === "loanAmount") {
      let amountWithoutCommas = value.replace(/(\$|,)/g, "");
      if (amountWithoutCommas.length > 9) {
        value = this.state.loanAmount;
      }
    }
    let newState = {};
    newState[name] = value;
    this.setState(newState, () => this.validateFields([name]));
  }

  handleAmountBlur(value, callback) {
    let num = parseInt(value.replace(/(\$|,)/g, ""));
    let correctAmount = "";
    if (Number(num) || num === 0) {
      correctAmount = "$" + num.toLocaleString();
    }
    this.setState({
      loanAmount: correctAmount
    }, callback);
  }

  handleBlur(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "loanAmount") {
      this.handleAmountBlur(value, function() {
        this.validateFields([name], "error");
      });
    } else {
      this.validateFields([name], "error");
    }
  }

  render() {
    let loanDescriptionOptions = _.map([
      "Buying an Existing Business",
      "Developing a Product",
      "Hiring Employees/Staff",
      "Marketing/Advertising",
      "Opening a New Location ",
      "Other",
      "Participating in Trade Show",
      "Purchasing Equipment",
      "Purchasing Inventory",
      "Purchasing Property",
      "Refinancing/consolidating debt",
      "Remodeling an existing location",
      "Working Capital"
    ], (x) => {
      return {label: x, value: x};
    });

    return (
      <div>
        <form ref={(input) => this.loanForm = input} onSubmit={(e) => this.handleSubmit(e)}>
          <CurrencyInput errorText={clientConfig.messages.validation.invalidLoanAmount} label="How much funding do you need?" name="loanAmount" onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} value={this.state.loanAmount} validationState={this.state.validStates.loanAmount} autoFocus/>
          <MultiSelectBox errorText={clientConfig.messages.validation.invalidLoanUsage} placeholder="- Select use of funds -" label="How will these funds be used?" name="loanDescription" onChange={this.handleSelectChange.bind(this)} validationState={this.state.validStates.loanDescription} value={this.state.loanDescription} options={loanDescriptionOptions} maxValues={3} onBlur={this.handleBlur.bind(this)}></MultiSelectBox>
          <TextArea errorText={clientConfig.messages.validation.invalidLoanDescription} label="Describe how you plan to use these funds" name="loanUsage" handleChange={this.handleChange.bind(this)} value={this.state.loanUsage} getValidationState={this.state.validStates.loanUsage} placeholder="I plan to purchase a larger oven to double the number of pizzas I can serve in an hour..." onBlur={this.handleBlur.bind(this)}/>
          <button className={styles.continueBtn} type="submit" disabled={!(this.isValidForm())}>
            CONTINUE
          </button>
        </form>
      </div>
    );
  };
}

function mapReduxStateToProps(reduxState) {
  return {loanFields: reduxState.lenderMatch.loanData};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(LoanInfo);
