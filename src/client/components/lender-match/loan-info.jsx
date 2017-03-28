import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CurrencyInput, TextArea, SelectBox} from '../helpers/form-helpers.jsx';
import MultiSelectBox from '../atoms/multiselect.jsx';
import {FormPanel} from '../common/form-styling.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import {getSelectBoxValidationState, getCurrencyValidationState, containsErrorOrNull, getTextAlphanumeicValidationState} from '../helpers/page-validator-helpers.jsx'
import styles from './lender-match.scss';
import {Col} from 'react-bootstrap';

class LoanInfo extends React.Component {
  constructor(props) {
    super();
    let initialData = props.loanFields || {};
    this.state = {
      loanAmount: initialData.loanAmount || "",
      loanDescription: initialData.loanDescription || "",
      loanUsage: initialData.loanUsage || "",
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
    validStates = Object.assign(validStates, getCurrencyValidationState("loanAmount", this.state.loanAmount));
    validStates = Object.assign(validStates, getSelectBoxValidationState("loanDescription", this.state.loanDescription));
    validStates = Object.assign(validStates, getTextAlphanumeicValidationState("loanUsage", this.state.loanUsage));
    this.setState({validStates: validStates})
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates);
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
    }, () => this.validateForm());
  }

  handleChange(e) {
    let loanFields = {};
    let name = e.target.name;
    let value = e.target.value;
    let newState = {};
    newState[name] = value;
    this.setState(newState, () => this.validateForm());
  }

  handleAmountChange(e) {
    let amount = e.target.value.replace(/(\$|,)/g, "");
    if (!/[^\d$,]/.test(amount) && amount.length < 10) {
      this.handleChange(e)
    }
  }

  handleFormat(e) {
    let loanFields = {};
    let num = parseInt(e.target.value.replace(/(\$|,)/g, ""));
    if (Number(num)) {
      this.setState({
        loanAmount: "$" + num.toLocaleString()
      });
    } else {
      this.setState({
        loanAmount: ""
      });
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
          <CurrencyInput label="How much funding do you need?" name="loanAmount" handleChange={this.handleAmountChange.bind(this)} handleFormat={this.handleFormat.bind(this)} value={this.state.loanAmount} getValidationState={this.state.validStates.loanAmount} autoFocus required/>
          <MultiSelectBox placeholder="- Select use of funds -" label="How will these funds be used?" name="loanDescription" onChange={this.handleSelectChange.bind(this)} getValidationState={this.state.validStates.loanDescription} value={this.state.loanDescription} options={loanDescriptionOptions} required maxValues={3}></MultiSelectBox>
          <TextArea label="Describe how you plan to use these funds" name="loanUsage" handleChange={this.handleChange.bind(this)} value={this.state.loanUsage} placeholder="I plan to purchase a larger oven to double the number of pizzas I can serve in an hour..."/>
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
