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
    }

    handleChange(e){
        let industryInfoFields = {};
        industryInfoFields[e.target.name] = e.target.value;
        this.setState({industryInfoFields: {...this.state.industryInfoFields, ...industryInfoFields}});
        console.log(this.state.industryInfoFields)
    }

    render() {
        return (
            <FormPanel title="Industry Info">
                <form ref={(input) => this.industryInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <TextInput     label="What is the name of your business?"
                                   name="businessInfoName"
                                   handleChange={this.handleChange.bind(this)}
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
