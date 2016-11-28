import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput } from '../helpers/form-helpers.jsx'
import * as ContactInfoActions from '../../actions/contact-info.js'
import { browserHistory } from 'react-router';


class ContactInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            contactInfoFields: {}
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createContactInfo(this.state.contactInfoFields);
        browserHistory.push('/form/loan');
        this.contactInfoForm.reset();
        console.log('handle submit called.');
    }

    handleChange(e){
        let contactInfoFields = {};
        contactInfoFields[e.target.name] = e.target.value;
        this.setState({contactInfoFields: {...this.state.contactInfoFields, ...contactInfoFields}});
        //console.log(this.state.contactFields)
    }

    render() {
        return (
            <div>
                <form ref={(input) => this.contactInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="col-xs-2 col-xs-offset-5">Contact Info</h2>
                    <TextInput     label="What is your full name?"
                                   name="contactFullName"
                                   handleChange={this.handleChange.bind(this)}
                                   //value={this.props.contactInfoData.contactFullName}
                    />

                    <TextInput     label="What is your phone number?"
                                   name="contactPhoneNumber"
                                   handleChange={this.handleChange.bind(this)}
                                   //value={this.props.contactInfoData.contactPhoneNumber}
                    />

                    <TextInput     label="What is your email address?"
                                   name="contactEmailAddress"
                                   handleChange={this.handleChange.bind(this)}
                                   //value={this.props.contactInfoData.contactEmailAddress}
                    />
                    <button className="col-xs-2 col-xs-offset-5" type="submit">Next </button>
                </form>
            </div>
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
