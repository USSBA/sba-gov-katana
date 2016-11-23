import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrencyInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import * as LoanActions from '../../actions/loan-form.js'
import { browserHistory } from 'react-router';
import { Col } from 'react-bootstrap';


class LoanForm extends React.Component {
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
        browserHistory.push('/success');
        this.loanForm.reset()
    }

    handleChange(e){
        let loanFields = {};
        loanFields[e.target.name] = e.target.value;
        this.setState({loanFields: {...this.state.loanFields, ...loanFields}});
        console.log(this.state.loanFields)
    }


    handleAmountChange(e){
        let amount = e.target.value.replace(/(\$|,)/g, "")
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
        }
    }

    render() {
        return (
            <div>
                <form ref={(input) => this.loanForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <CurrencyInput label="How much funding do you need?"
                                   name="loanAmount"
                                   handleChange={this.handleAmountChange.bind(this)}
                                   handleFormat={this.handleFormat.bind(this)}
                                   value={this.state.loanFields.loanAmount}
                    />

                    <SelectBox label="How will these funds be used?"
                               name="loanDescription"
                               handleChange={this.handleChange.bind(this)}
                               defaultValue=""
                    >
                        <option value="" disabled>- Select use of funds -</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                    </SelectBox>

                    <TextArea label="Describe how these funds will be used?"
                              name="loanUsage"
                              handleChange={this.handleChange.bind(this)}
                              placeholder="Include details such as this sample placeholder and this other example."

                    />

                    <button className="col-xs-2 col-xs-offset-5"
                            type="submit">
                        See Matches </button>

                </form>
            </div>
        );
    };
}

function mapReduxStateToProps(reduxState) {
    console.log(reduxState);
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
)(LoanForm);

