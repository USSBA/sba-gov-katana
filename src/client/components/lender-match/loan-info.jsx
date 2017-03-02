import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrencyInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import { FormPanel } from '../common/form-styling.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import { browserHistory } from 'react-router';
import { getSelectBoxValidationState, getCurrencyValidationState } from '../helpers/page-validator-helpers.jsx'
import styles from '../../styles/lender-match/lender-match.scss';
import { Col } from 'react-bootstrap';

export class LoanInfo extends React.Component {
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
    })
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
  ;

  render() {
    return (
      <FormPanel title="What are your funding needs?" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
        <form ref={ (input) => this.loanForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <CurrencyInput label="How much funding do you need?" name="loanAmount" handleChange={ this.handleAmountChange.bind(this) } handleFormat={ this.handleFormat.bind(this) } value={ this.state.loanFields.loanAmount }
            getValidationState={ this.state.validStates["loanAmount"] } autoFocus required />
          <SelectBox label="How will these funds be used?" name="loanDescription" handleChange={ this.handleChange.bind(this) } getValidationState={ this.state.validStates["loanDescription"] } defaultValue={ this.state.loanFields.loanDescription }
            required>
            <option value="" disabled>- Select use of funds -</option>
            <option value="Buying an Existing Business">Buying an Existing Business</option>
            <option value="Developing a Product">Developing a Product</option>
            <option value="Hiring Employees/Staff">Hiring Employees/Staff</option>
            <option value="Marketing/Advertising">Marketing/Advertising</option>
            <option value="Opening a New Location ">Opening a New Location </option>
            <option value="Other">Other</option>
            <option value="Participating in Trade Show">Participating in Trade Show</option>
            <option value="Purchasing Equipment">Purchasing Equipment</option>
            <option value="Purchasing Inventory">Purchasing Inventory</option>
            <option value="Purchasing Property">Purchasing Property</option>
            <option value="Refinancing/consolidating debt">Refinancing/consolidating debt</option>
            <option value="Remodeling an existing location">Remodeling an existing location</option>
            <option value="Working Capital">Working Capital</option>
          </SelectBox>
          <TextArea label="Describe how these funds will be used?" name="loanUsage" handleChange={ this.handleChange.bind(this) } value={ this.state.loanFields.loanUsage } placeholder="Include details such as this sample placeholder and this other example."
          />
          <Col md={ 6 } mdOffset={ 3 }>
          <button className={ styles.continueBtn } type="submit" disabled={ !(this.isValidForm()) }> Continue </button>
          </Col>
        </form>
      </FormPanel>
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

export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(LoanInfo);
