import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormPanel } from '../common/form-styling.jsx'
import { FormGroup, Checkbox, Col } from 'react-bootstrap'
import CheckBox from '../atoms/checkbox.jsx';
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.reviewAnswers(this.state.additionalInfoFields);
    this.props.locationActions.locationChange("/linc/form/review");
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
            <label className={addInfoStyles.label}>Select all that apply to you: </label>
            <CheckBox autoFocus={true} name="hasWrittenPlan" label="I have written a business plan" handleChange={this.handleClick.bind(this)} checked={this.state.additionalInfoFields.hasWrittenPlan}/>
            <CheckBox name="hasFinancialProjections" label="I have financial projections" handleChange={this.handleClick.bind(this)} checked={ this.state.additionalInfoFields.hasFinancialProjections }/>
            <CheckBox name="isGeneratingRevenue" label="I'm generating revenue" handleChange={this.handleClick.bind(this)} checked={ this.state.additionalInfoFields.isGeneratingRevenue }/>
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
