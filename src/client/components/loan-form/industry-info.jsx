import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import * as IndustryInfoActions from '../../actions/industry-info.js'
import { browserHistory } from 'react-router';
import { FormPanel } from '../common/form-styling.jsx'


class IndustryInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            industryInfoFields: {}
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createIndustryInfo(this.state.industryInfoFields);
        browserHistory.push('/form/loan');
        this.industryInfoForm.reset()
        // console.log(this.state)
    }

    handleChange(e){
        let industryInfoFields = {};
        industryInfoFields[e.target.name] = e.target.value;
        this.setState({industryInfoFields: {...this.state.industryInfoFields, ...industryInfoFields}});
        // console.log(this.state.industryInfoFields)
    }

    render() {
        return (
            <FormPanel title="What's your industry?" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
                <form ref={(input) => this.industryInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <SelectBox
                        label="In what industry is your business?"
                        name = "industryType"
                        handleChange={this.handleChange.bind(this)}
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>- Select use of funds -</option>
                        <option value="Advertising/Marketing">Advertising/Marketing</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Automotive/Service Station">Automotive/Service Station</option>
                        <option value="Chemical/Pharmaceutical">Chemical/Pharmaceutical</option>
                        <option value="Construction">Construction</option>
                        <option value="Education">Education</option>
                        <option value="Energy">Energy</option>
                        <option value="Entertainment/Recreation">Entertainment/Recreation</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Food Services">Food Services</option>
                        <option value="Health Care">Health Care</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Media">Media</option>
                        <option value="Non-Profit">Non-Profit</option>
                        <option value="Other">Other</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Restaurant/Bar">Restaurant/Bar</option>
                        <option value="Retail">Retail</option>
                        <option value="Technology">Technology</option>
                        <option value="Transportation/Logistics">Transportation/Logistics</option>
                    </SelectBox>

                    <SelectBox
                        label="What's your experience in this industry?"
                        name = "industryExperience"
                        handleChange={this.handleChange.bind(this)}
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>- Select use of funds -</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-5 years">2-5 years</option>
                        <option value="5+ years">5+ years</option>
                    </SelectBox>

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
        industryInfoData: state.industryInfoData
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(IndustryInfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndustryInfoForm);
