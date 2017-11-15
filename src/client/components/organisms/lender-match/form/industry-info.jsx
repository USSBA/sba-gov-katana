import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { includes, map } from 'lodash'
import { MultiSelect, Radio } from 'atoms'
import { FormPageButtons } from 'molecules'
import * as LenderMatchActions from '../../../../actions/lender-match.js'
import * as LocationChangeActions from '../../../../actions/navigation.js'
import {
  getSelectBoxValidationState,
  containsErrorOrNull
} from '../../../../services/form-validation-helpers.js'
import constants from '../../../../services/constants.js'
import { logEvent } from '../../../../services/analytics.js'
import styles from './lender-match.scss'

class IndustryInfoForm extends React.Component {
  constructor(props) {
    super()
    let initialData = props.industryInfoFields || {}
    this.state = {
      industryType: initialData.industryType || '',
      industryExperience: initialData.industryExperience || '',
      validStates: {
        industryType: null,
        industryExperience: null
      }
    }
  }

  componentDidMount() {
    this.validateFields(['industryType', 'industryExperience'])
    window.scrollTo(0, 0)
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    let validationState = validationFunction(
      name,
      this.state[name],
      defaultWhenNotSuccessful || null
    )
    if (validationState[name] === 'error') {
      logEvent({
        category: 'Lender Match Form',
        action: 'Error Event',
        label: name
      })
    }
    return validationState
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates
    if (includes(fields, 'industryType')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(
          getSelectBoxValidationState,
          'industryType',
          defaultWhenNotSuccessful
        )
      )
    }
    if (includes(fields, 'industryExperience')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(
          getSelectBoxValidationState,
          'industryExperience',
          defaultWhenNotSuccessful
        )
      )
    }

    this.setState({ validStates: validStates })
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.createIndustryInfo({
      industryType: this.state.industryType,
      industryExperience: this.state.industryExperience
    })
    this.props.locationActions.locationChange('/lendermatch/form/loan', {
      action: 'Continue Button Pushed',
      label: '/lendermatch/form/industry'
    })
    this.industryInfoForm.reset()
  }

  handleChange(newValue) {
    this.setState(
      {
        industryExperience: newValue
      },
      () => this.validateFields(['industryExperience'])
    )
  }

  handleSelectChange(newValue) {
    this.setState(
      {
        industryType: newValue
      },
      () => this.validateFields(['industryType'])
    )
  }

  handleIndustryTypeBlur() {
    this.validateFields(['industryType'], 'error')
  }

  handleIndustryExperienceBlur() {
    this.validateFields(['industryExperience'], 'error')
  }

  handleFocus(nameOrEvent) {
    let name =
      nameOrEvent && nameOrEvent.target && nameOrEvent.target.name
        ? nameOrEvent.target.name
        : nameOrEvent
    logEvent({
      category: 'Lender Match Form',
      action: 'Focus Event',
      label: name
    })
  }

  render() {
    let industryTypeOptions = map(
      [
        'Professional Services',
        'Manufacturing',
        'Retail',
        'Restaurant/Bar',
        'Advertising/Marketing',
        'Agriculture',
        'Chemical/Pharmaceutical',
        'Construction',
        'Education',
        'Energy',
        'Entertainment/Recreation',
        'Financial Services',
        'Food Services',
        'Health Care',
        'Hospitality',
        'Media',
        'Non-Profit',
        'Real Estate',
        'Technology',
        'Transportation/Logistics',
        'Automotive/Service Station',
        'Other'
      ],
      x => {
        return { label: x, value: x }
      }
    )

    let radioButtonOptions = [
      {
        value: 'Less than 1 year',
        text: 'Less than 1 year'
      },
      {
        value: '1-2 years',
        text: '1-2 years'
      },
      {
        value: '2-5 years',
        text: '2-5 years'
      },
      {
        value: '5+ years',
        text: '5+ years'
      }
    ]

    let id = 'lender-match-industry-info-form'
    return (
      <div>
        <form
          id={id}
          ref={form => (this.industryInfoForm = form)}
          onSubmit={e => this.handleSubmit(e)}
        >
          <MultiSelect
            id={id + '-name'}
            errorText={constants.messages.validation.invalidIndustry}
            label="In what industry is your business?"
            name="industryType"
            onChange={this.handleSelectChange.bind(this)}
            validationState={this.state.validStates.industryType}
            value={this.state.industryType}
            options={industryTypeOptions}
            onBlur={this.handleIndustryTypeBlur.bind(this)}
            autoFocus
            maxValues={3}
            onFocus={this.handleFocus.bind(this)}
          />
          <Radio
            id={id + '-experience'}
            errorText={constants.messages.validation.invalidIndustryExperience}
            label="How much experience do you have?"
            name="industryExperience"
            onChange={this.handleChange.bind(this)}
            validationState={this.state.validStates.industryExperience}
            value={this.state.industryExperience}
            options={radioButtonOptions}
            onBlur={this.handleIndustryExperienceBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
          />
          <FormPageButtons
            parentId={id}
            backButtonHandler={this.props.locationActions.goBack}
            continueButtonHandler={this.handleSubmit.bind(this)}
            continueButtonDisabled={!this.isValidForm()}
          />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { industryInfoFields: state.lenderMatch.industryInfoData }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndustryInfoForm)
