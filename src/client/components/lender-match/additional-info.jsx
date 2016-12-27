import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormPanel } from '../common/form-styling.jsx'
import { browserHistory } from 'react-router';
import { FormGroup, Checkbox, Col } from 'react-bootstrap'
import * as AdditionalInfoActions from '../../actions/additional-info.js'
import styles from '../../styles/lender-match/lender-match.scss';



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
    browserHistory.push("/form/review");
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
      <FormPanel title="Anything else you can tell us?" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
        <form ref={ (input) => this.addInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <FormGroup className="col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3">
            <label>Check all that apply to you: </label>
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
          <Col md={ 6 } mdOffset={ 3 }>
          <button className={ styles.continueBtn } type="submit">
            Continue </button>
          </Col>
        </form>
      </FormPanel>
    )
  }
}


function mapReduxStateToProps(reduxState) {
  return {
    additionalInfoFields: reduxState.additionalInfoReducer.additionalInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AdditionalInfoActions, dispatch)
  }
}
export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(AdditionalInfoForm);
