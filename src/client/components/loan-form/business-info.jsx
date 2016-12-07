import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import * as BusinessInfoActions from '../../actions/business-info.js'
import { browserHistory } from 'react-router';
import { FormPanel } from '../common/form-styling.jsx'
import { getBusinessNameValidationState } from '../helpers/page-validator-helpers.jsx'


class BusinessInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            businessInfoFields: {},
            validStates:{
                "businessInfoName": null,
                "businessInfoZipcode": null,
                "businessInfoType": null,
                "businessInfoDescription": null
            }
        }
    }

    isValidForm(){
        let validForm = true;
        for (var inputState in this.state.validStates){
            if(this.state.validStates[inputState] === "error" || this.state.validStates[inputState] === null){
                validForm = false;
            }
        }
        return validForm
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createBusinessInfo(this.state.businessInfoFields);
        browserHistory.push('/form/industry');
        this.businessInfoForm.reset()
    }

    handleChange(e){
        let businessInfoFields = {};
        businessInfoFields[e.target.name] = e.target.value;
        this.setState({businessInfoFields: {...this.state.businessInfoFields, ...businessInfoFields}});
    this.getValidationState(e)
    }

    getValidationState(e) {
        let validStates = {}
        if (e.target.name === "businessInfoName") {
            validStates = getBusinessNameValidationState(e)
        } else if (e.target.name === "businessInfoZipcode") {

        } else if (e.target.name === "businessInfoType") {

        } else if (e.target.name === "businessInfoDescription") {

        } else if (e.target.name === "businessInfoWebsite") {

        }
        this.setState({validStates: {...this.state.validStates, ...validStates}})
    }

    render() {
        return (
            <FormPanel title="Business Info"  subtitle="Here's why we're asking for this info and how it will help you get a loan.">
                <form ref={(input) => this.businessInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <TextInput
                        label="What is the name of your business?"
                        name="businessInfoName"
                        handleChange={this.handleChange.bind(this)}
                        getValidationState={this.state.validStates["businessInfoName"]}
                        required
                    />

                    <TextInput
                        label="What is the business ZIP code?"
                        name="businessInfoZipcode"
                        handleChange={this.handleChange.bind(this)}
                        required
                    />

                    <TextInput
                        label="What is your business website?"
                        name="businessInfoWebsite"
                        handleChange={this.handleChange.bind(this)}
                        placeholder="Optional"
                    />

                    <SelectBox
                        label="What type of business is it?"
                        name="businessInfoType"
                        handleChange={this.handleChange.bind(this)}
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>- Select business type -</option>
                        <option value="Profit">Profit</option>
                        <option value="Non-profit">Non-profit</option>
                    </SelectBox>

                    <TextArea
                        label="Describe what your business does"
                        name="businessInfoDescription"
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
    //console.log(reduxState);
    return {
        businessInfoData: state.businessInfoData
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(BusinessInfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessInfoForm);
