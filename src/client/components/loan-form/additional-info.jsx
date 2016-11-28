import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SelectBox, CheckBox } from '../helpers/form-helpers.jsx'
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
        browserHistory.push("/success");
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
            <Panel className={styles.formPanel}>
                <ButtonToolbar>
                    <button type="button" className="btn btn-default btn-sm pull-left" onClick={browserHistory.goBack}>
                        <span className="glyphicon glyphicon-chevron-left"></span> Back
                    </button>
                </ButtonToolbar>
                <h2 className="col-md-4 col-md-offset-5">Additional Info</h2>
                <form ref={(input) => this.addInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <SelectBox
                        label="What's your industry experience?"
                        name = "industryExp"
                        handleChange={this.handleChange.bind(this)}>
                        <option defaultValue=""></option>
                        <option value="none">none</option>
                        <option value="lots">lots</option>
                    </SelectBox>
                    <FormGroup className="col-xs-6 col-xs-offset-3">
                        <label>Check all that apply to you: </label>
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

                    <button className="col-xs-2 col-xs-offset-5" type="submit">Review Answers</button>
                </form>
            </Panel>
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
