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
            contactInfoFields: {}
        }
    };

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createContactInfo(this.state.contactInfoFields);
        browserHistory.push('/form/business');
        //this.contactInfoForm.reset();

    };

    handleChange(e){
        let contactInfoFields = {};
        contactInfoFields[e.target.name] = e.target.value;
        this.setState({contactInfoFields: {...this.state.contactInfoFields, ...contactInfoFields}});
    };

    render() {
        return (
            <FormPanel title="How do we reach you?" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
                <form ref={(input) => this.contactInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <TextInput     label="What is your full name?"
                                   name="contactFullName"
                                   handleChange={this.handleChange.bind(this)}
                                   required
                    />

                    <TextInput     label="What is your phone number?"
                                   name="contactPhoneNumber"
                                   pattern="[\d]{7,10}"
                                   handleChange={this.handleChange.bind(this)}
                                   required
                    />

                    <TextInput     label="What is your email address?"
                                   name="contactEmailAddress"
                                   pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                   handleChange={this.handleChange.bind(this)}
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
