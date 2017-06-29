import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as LenderMatchActions from '../../../../actions/lender-match.js';
import * as LocationChangeActions from '../../../../actions/location-change.js';
import {logEvent} from "../../../../services/analytics.js";

import CheckBox from '../../../atoms/checkbox/checkbox.jsx';
import FormPageButtons from '../../../molecules/form-page-buttons/form-page-buttons.jsx';
import styles from './lender-match.scss';
import addInfoStyles from './additional-info.scss'

export class AdditionalInfoForm extends React.Component {
  constructor(props) {
    super();
    let additionalInfoFields = Object.assign({}, {
      hasWrittenPlan: false,
      hasFinancialProjections: false,
      isGeneratingRevenue: false,
      isVeteran: false
    }, props.additionalInfoFields);
    this.state = {
      additionalInfoFields: additionalInfoFields
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.reviewAnswers(this.state.additionalInfoFields);
    this.props.locationActions.locationChange("/linc/form/review", {
      action: "Continue Button Pushed",
      label: "/linc/form/review"
    });
    this.addInfoForm.reset()
  };

  handleClick(e) {
    let newState = {};
    newState[e.target.name] = e.target.checked;
    this.setState({
      additionalInfoFields: {
        ...this.state.additionalInfoFields,
        ...newState
      }
    }, function() {
      logEvent({"category": "Lender Match Form", "action": "Focus Event", "label": e.target.name});
    });
  }

  render() {
    let id = "lender-match-additional-info-form";
    return (
      <div>
        <form id={id} ref={(input) => this.addInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
          <h6 className={addInfoStyles.label}>Select all that apply to you:</h6>
          <CheckBox id={id+"-plan"} autoFocus={true} name="hasWrittenPlan" label="I have written a business plan" handleChange={this.handleClick.bind(this)} checked={this.state.additionalInfoFields.hasWrittenPlan}/>
          <CheckBox id={id+"-projections"} name="hasFinancialProjections" label="I have financial projections" handleChange={this.handleClick.bind(this)} checked={this.state.additionalInfoFields.hasFinancialProjections}/>
          <CheckBox id={id+"-revenue"} name="isGeneratingRevenue" label="I'm generating revenue" handleChange={this.handleClick.bind(this)} checked={this.state.additionalInfoFields.isGeneratingRevenue}/>
          <FormPageButtons parentId={id} backButtonHandler={this.props.locationActions.goBack} continueButtonHandler={this.handleSubmit.bind(this)}/>
        </form>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {additionalInfoFields: reduxState.lenderMatch.additionalInfoData};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(AdditionalInfoForm);
