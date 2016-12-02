import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SelectBox, CheckBox } from '../helpers/form-helpers.jsx'
import { FormPanel } from '../common/form-styling.jsx'
import { browserHistory } from 'react-router';

import { FormGroup, Checkbox, Panel, ButtonToolbar, Row } from 'react-bootstrap'

import * as AdditionalInfoActions from '../../actions/additional-info.js'

import styles from '../common/styles.scss';


export class AdditionalInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            additionalInfoFields: {
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.reviewAnswers(this.state.additionalInfoFields);
        // console.log(this.state)
        browserHistory.push("/form/review");
        this.addInfoForm.reset()
    };

    handleChange(e){
        let additionalInfoFields = {};
        additionalInfoFields[e.target.name] = e.target.value;
        this.setState({additionalInfoFields: {...this.state.additionalInfoFields, ...additionalInfoFields}})
        // console.log(this.state)
    }

    handleClick(e){
        let additionalInfoFields = {};
        additionalInfoFields[e.target.name] = e.target.value;
        this.setState({additionalInfoFields: {...this.state.additionalInfoFields, ...additionalInfoFields}});
        // console.log(this.state);
    }

    render(){
        return (
            <FormPanel title="Additional Info">
                <form ref={(input) => this.addInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>

                    <SelectBox
                        label="What's your industry experience?"
                        name = "industryExp"
                        handleChange={this.handleChange.bind(this)}>
                        <option value="" disabled>- Select use of funds -</option>
                        <option defaultValue=""></option>
                        <option value="none">none</option>
                        <option value="lots">lots</option>
                    </SelectBox>

                    <FormGroup className="col-xs-6 col-xs-offset-3">
                        <label className={styles.controlLabel}>Check all that apply to you: </label>
                        <Checkbox name = "hasWrittenPlan" onClick={this.handleClick.bind(this)}>
                            I have a written business plan
                        </Checkbox>
                        <Checkbox name = "hasFinancialProjections" onClick={this.handleClick.bind(this)}>
                            I have financial projections
                        </Checkbox>
                        <Checkbox name="isGeneratingRevenue" onClick={this.handleClick.bind(this)}>
                            I'm generating revenue
                        </Checkbox>
                        <Checkbox name="isVeteran" onClick={this.handleClick.bind(this)}>
                            I'm a veteran
                        </Checkbox>
                    </FormGroup>

                    <button className="btn btn-default col-xs-2 col-xs-offset-5"
                            type="submit">
                        Continue </button>
                </form>
            </FormPanel>
        )
    }
}


function mapReduxStateToProps(reduxState) {
    console.log(reduxState)
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(AdditionalInfoActions, dispatch)
    }
}
export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(AdditionalInfoForm);
