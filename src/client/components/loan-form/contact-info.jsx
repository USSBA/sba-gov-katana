import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput } from '../helpers/form-helpers.jsx'
import { FormPanel } from '../common/form-styling.jsx'
import * as ContactInfoActions from '../../actions/contact-info.js'
import { browserHistory } from 'react-router';


class ContactInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            contactInfoFields: {},
            errors: {
                contactPhoneNumber: null
            }
        }
    };

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createContactInfo(this.state.contactInfoFields);
        browserHistory.push('/form/business');
        this.contactInfoForm.reset();

    };

    handleChange(e){
        let contactInfoFields = {};
        contactInfoFields[e.target.name] = e.target.value;
        this.setState({contactInfoFields: {...this.state.contactInfoFields, ...contactInfoFields}});
        this.getValidationState(e)
    };

    getValidationState(e) {
        if (e.target.name === "contactFullName") {
            this.getNameValidationState(e)
        } else if (e.target.name === "contactPhoneNumber") {
            this.getPhoneValidationState(e)
        } else if (e.target.name === "contactEmailAddress") {
            this.getEmailValidationState(e)
        }
    };

    getNameValidationState(e) {
        let errors = {};
        var nameRegex = new RegExp(/^[a-z ,.'-]+$/i)
        if (nameRegex.test(e.target.value)) {
            errors[e.target.name] = "success";
        } else if (e.target.value.length === 0) {
            errors[e.target.name] = null;
        } else {
            errors[e.target.name] = "error";
        }
        this.setState({errors: {...this.state.errors, ...errors}})
    }

    getPhoneValidationState(e) {
        let errors = {};
        if (e.target.value.length <= 10 && e.target.value.length >= 7){
            errors[e.target.name] = "success";
        } else if (e.target.value.length < 7) {
            errors[e.target.name] = null;
        } else {
            errors[e.target.name] = "error";
        }
        this.setState({errors: {...this.state.errors, ...errors}})
    }

    getEmailValidationState(e) {
        let errors ={};
        var emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/)
        if (emailRegex.test(e.target.value)) {
            errors[e.target.name] = "success";
        } else if (e.target.value.length === 0) {
            errors[e.target.name] = null;
        } else if ((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(e.target.value)) {
            errors[e.target.name] = "error";
        }
        this.setState({errors: {...this.state.errors, ...errors}})
    }

    render() {
        return (
            <FormPanel title="How do we reach you?" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
                <form ref={(input) => this.contactInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <TextInput     label="What is your full name?"
                                   name="contactFullName"
                                   handleChange={this.handleChange.bind(this)}
                                   getValidationState={this.state.errors["contactFullName"]}
                                   required
                    />

                    <TextInput     label="What is your phone number?"
                                   name="contactPhoneNumber"
                                   pattern="[\d]{7,10}"
                                   handleChange={this.handleChange.bind(this)}
                                   getValidationState={this.state.errors["contactPhoneNumber"]}
                                   required
                    />

                    <TextInput     label="What is your email address?"
                                   name="contactEmailAddress"
                                   pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                   handleChange={this.handleChange.bind(this)}
                                   getValidationState={this.state.errors["contactEmailAddress"]}
                                   required
                    />
                    <button className="btn btn-default col-xs-2 col-xs-offset-5"
                            type="submit">
                        Continue </button>
                </form>
            </FormPanel>
        );
    };
}

function mapStateToProps(state) {
    return {
        contactInfoData: state.contactInfoData
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(ContactInfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactInfoForm);
