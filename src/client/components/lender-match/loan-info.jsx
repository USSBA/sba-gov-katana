import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrencyInput, TextArea, SelectBox, MultiSelectBox } from '../helpers/form-helpers.jsx'
import { FormPanel } from '../common/form-styling.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import { browserHistory } from 'react-router';
import { getSelectBoxValidationState, getCurrencyValidationState } from '../helpers/page-validator-helpers.jsx'
import styles from './lender-match.scss';
import { Col } from 'react-bootstrap';

class LoanInfo extends React.Component {
  constructor(props) {
    super();
    let loanFields = Object.assign({}, {
      loanAmount: "",
      loanDescription: "",
      loanUsage: ""
    }, props.loanFields);
    let validStates = {};
    validStates = Object.assign(validStates, this.getValidationState("loanAmount", loanFields.loanAmount));
    if (loanFields.loanDescription) {
      validStates = Object.assign(validStates, this.getValidationState("loanDescription", loanFields.loanDescription));
    }
    this.state = {
      loanFields: loanFields,
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
    this.props.actions.createLoan(this.state.loanFields);
    browserHistory.push('/linc/form/additional');
    this.loanForm.reset()
  }

  handleSelectChange(newValue) {
    let newLoanFields = _.merge(this.state.loanFields, {
      loanDescription: newValue
    });
    this.setState({
      loanFields: newLoanFields
    });
    let validStates = this.getValidationState("loanDescription", newValue);
    let newValidStates = _.merge(this.state.validStates, validStates);
    this.setState({
      validStates: newValidStates
    });
  }

  handleChange(e) {
    let loanFields = {};
    loanFields[e.target.name] = e.target.value;
    this.setState({
      loanFields: {
        ...this.state.loanFields,
        ...loanFields
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
      loanFields[e.target.name] = "$" + num.toLocaleString();
      this.setState({
        loanFields: {
          ...this.state.loanFields,
          ...loanFields
        }
      });
    } else {
      loanFields[e.target.name] = "";
      this.setState({
        loanFields: {
          ...this.state.loanFields,
          ...loanFields
        }
      });
    }
  }

  getValidationState(name, value) {
    let validStates = {}
    if (name === "loanAmount") {
      validStates = getCurrencyValidationState(name, value)
    } else if (name === "loanDescription") {
      validStates = getSelectBoxValidationState(name, value)
    }
    return validStates;

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
      return {
        label: x,
        value: x
      };
    });

    return (
      <div>
        <form ref={ (input) => this.loanForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <CurrencyInput label="How much funding do you need?" name="loanAmount" handleChange={ this.handleAmountChange.bind(this) } handleFormat={ this.handleFormat.bind(this) } value={ this.state.loanFields.loanAmount }
            getValidationState={ this.state.validStates["loanAmount"] } autoFocus required/>
          <MultiSelectBox placeholder="- Select use of funds -" label="How will these funds be used?" name="loanDescription" onChange={ this.handleSelectChange.bind(this) } getValidationState={ this.state.validStates["loanDescription"] }
            value={ this.state.loanFields.loanDescription } options={ loanDescriptionOptions } required></MultiSelectBox>
          <TextArea label="Describe how these funds will be used?" name="loanUsage" handleChange={ this.handleChange.bind(this) } value={ this.state.loanFields.loanUsage } placeholder="Include details such as this sample placeholder and this other example."
          />
          <button className={ styles.continueBtn } type="submit" disabled={ !(this.isValidForm()) }> CONTINUE </button>
        </form>
      </div>
      );
  }
  ;
}

function mapReduxStateToProps(reduxState) {
  return {
    loanFields: reduxState.lenderMatch.loanData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(LoanInfo);
