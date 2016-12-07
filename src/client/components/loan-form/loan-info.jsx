import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrencyInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import { FormPanel } from '../common/form-styling.jsx'
import * as LoanActions from '../../actions/loan-form.js'
import { browserHistory } from 'react-router';


export class LoanInfo extends React.Component {
    constructor(){
        super();
        this.state ={
            loanFields: {
                loanAmount: ""
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createLoan(this.state.loanFields);
        browserHistory.push('/form/additional');
        this.loanForm.reset()
    }

    handleChange(e){
        let loanFields = {};
        loanFields[e.target.name] = e.target.value;
        this.setState({loanFields: {...this.state.loanFields, ...loanFields}});
    }

    handleAmountChange(e){
        let amount = e.target.value.replace(/(\$|,)/g, "");
        if (!/[^\d$,]/.test(amount) && amount.length < 10) {
            this.handleChange(e)
        }
    }

    handleFormat(e){
        let loanFields = {};
        let num = parseInt(e.target.value.replace(/(\$|,)/g, ""));
        if(Number(num)) {
            loanFields[e.target.name] = "$" + num.toLocaleString();
            this.setState({loanFields: {...this.state.loanFields, ...loanFields}});
        } else {
            loanFields[e.target.name] = "";
            this.setState({loanFields: {...this.state.loanFields, ...loanFields}});
        }
    }

    render() {
        return (
            <FormPanel title="Loan Info" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
                <form ref={(input) => this.loanForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <CurrencyInput label="How much funding do you need?"
                                   name="loanAmount"
                                   handleChange={this.handleAmountChange.bind(this)}
                                   handleFormat={this.handleFormat.bind(this)}
                                   value={this.state.loanFields.loanAmount}
                                   required
                    />

                    <SelectBox label="How will these funds be used?"
                               name="loanDescription"
                               handleChange={this.handleChange.bind(this)}
                               defaultValue=""
                               required
                    >
                        <option value="" disabled>- Select use of funds -</option>
                        <option value="Buying an Existing Business">Buying an Existing Business</option>
                        <option value="Developing a Product">Developing a Product</option>
                        <option value="Hiring Employees/Staff">Hiring Employees/Staff</option>
                        <option value="Marketing/Advertising">Marketing/Advertising</option>
                        <option value="Opening a New Location ">Opening a New Location </option>
                        <option value="Participating in Trade Show">Participating in Trade Show</option>
                        <option value="Purchasing Equipment">Purchasing Equipment</option>
                        <option value="Purchasing Inventory">Purchasing Inventory</option>
                        <option value="Purchasing Property">Purchasing Property</option>
                        <option value="Refinancing/consolidating debt">Refinancing/consolidating debt</option>
                        <option value="Remodeling an existing location">Remodeling an existing location</option>
                        <option value="Other">Other</option>
                    </SelectBox>

                    <TextArea label="Describe how these funds will be used?"
                              name="loanUsage"
                              handleChange={this.handleChange.bind(this)}
                              placeholder="Include details such as this sample placeholder and this other example."

                    />

                    <button className="btn btn-default col-xs-2 col-xs-offset-5"
                            type="submit">
                        Continue </button>

                </form>
            </FormPanel>
        );
    };
}

function mapReduxStateToProps(reduxState) {
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(LoanActions, dispatch)
    }
}

export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(LoanInfo);

