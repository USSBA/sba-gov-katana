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
            contactFields: {
                contactName: "",
                contactPhone: "",
                contactEmail: ""
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createContactInfo(this.state.contactFields);
        browserHistory.push('/form/loan');
        this.loanForm.reset()
    }

    handleChange(e){
        let contactFields = {};
        contactFields[e.target.name] = e.target.value;
        this.setState({contactFields: {...this.state.contactFields, ...contactFields}});
        console.log(this.state.contactFields)
    }

    render() {
        return (
            <div>
                <form ref={(input) => this.loanForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="col-xs-2 col-xs-offset-5">Contact Info</h2>
                    <TextInput     label="What is your full name?"
                                   name="contactName"
                                   handleChange={this.handleChange.bind(this)}
                    />

                    <TextInput     label="What is your phone number?"
                                   name="phoneNumber"
                                   handleChange={this.handleChange.bind(this)}
                    />

                    <TextInput     label="What is your email address?"
                                   name="address"
                                   handleChange={this.handleChange.bind(this)}
                    />
                    <button className="col-xs-2 col-xs-offset-5" type="submit">Next </button>
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
        actions: bindActionCreators(ContactInfoActions, dispatch)
    }
}

export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(ContactInfoForm);
