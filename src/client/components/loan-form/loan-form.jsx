import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoanActions from '../../actions/loan-form.js'


class LoanForm extends React.Component {
    constructor(){
        super();
        this.state ={
            loanFields: {}
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createLoan(this.state.loanFields);
        this.loanForm.reset()
    }

    handleInputChange(e){
        const loanFields = {};
        loanFields[e.target.name] = e.target.value;
        this.setState({loanFields: Object.assign({}, this.state.loanFields, loanFields)});
        console.log(this.state.loanFields)
    }

    render() {
        return (
            <div>
                <form ref={(input) => this.loanForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <p>How much funding do you need?</p>
                    <input name="textInput" onChange={(e) => this.handleInputChange(e)}/>
                    <p>How will these funds be used?</p>
                    <select name="selectInput" onChange={(e) => this.handleInputChange(e)}>
                        <option  value="option-1">option-1</option>
                        <option  value="option-2">option-2</option>
                    </select>
                    <button type="submit"> See Matches </button>
                </form>
            </div>
        );
    };
}

function mapReduxStateToProps(reduxState) {
    console.log(reduxState)
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
