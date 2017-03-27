import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormPanel } from '../common/form-styling.jsx'
import { FormGroup, Checkbox, Col } from 'react-bootstrap'
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import styles from './lender-match.scss';



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

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.reviewAnswers(this.state.additionalInfoFields);
    this.props.locationActions.locationChange("/linc/form/review", {
      action: "Continue Button Pushed",
      label: "/linc/form/review"
    });
    this.addInfoForm.reset()
  }
  ;

  handleClick(e) {
    let newState = {};
    newState[e.target.name] = e.target.checked;
    this.setState({
      additionalInfoFields: {
        ...this.state.additionalInfoFields,
        ...newState
      }
    });
  }

  render() {
    return (
      <div>
        <form ref={ (input) => this.addInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <FormGroup>
            <label>These components will get destroyed soon: </label>
            <Checkbox name="hasWrittenPlan" checked={ this.state.additionalInfoFields.hasWrittenPlan } onChange={ this.handleClick.bind(this) }>
              I have a written business plan
            </Checkbox>
            <Checkbox name="hasFinancialProjections" checked={ this.state.additionalInfoFields.hasFinancialProjections } onChange={ this.handleClick.bind(this) }>
              I have financial projections
            </Checkbox>
            <Checkbox name="isGeneratingRevenue" checked={ this.state.additionalInfoFields.isGeneratingRevenue } onChange={ this.handleClick.bind(this) }>
              I'm generating revenue
            </Checkbox>
            <Checkbox name="isVeteran" checked={ this.state.additionalInfoFields.isVeteran } onChange={ this.handleClick.bind(this) }>
              I'm a veteran
            </Checkbox>
          </FormGroup>
          <button className={ styles.continueBtn } type="submit"> CONTINUE </button>
        </form>
      </div>
    )
  }
}


function mapReduxStateToProps(reduxState) {
  return {
    additionalInfoFields: reduxState.lenderMatch.additionalInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}
export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(AdditionalInfoForm);
