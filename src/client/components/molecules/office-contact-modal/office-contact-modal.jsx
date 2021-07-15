/* eslint-disable complexity */
import React from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'
import { bindActionCreators } from 'redux'
import { includes, isEmpty } from 'lodash'
import { logEvent, logSet, logModal } from '../../../services/analytics.js'
import Checkbox from '../../atoms/checkbox/checkbox-lib.jsx'
import { runMiscAction, postMiscAction } from '../../../fetch-content-helper.js'
import constants from '../../../services/constants.js'
import config from '../../../services/client-config.js'
import envelopeIcon from 'assets/svg/envelope.svg'
import exitIcon from 'assets/svg/close_button.svg'
import styles from './office-contact-modal.scss'
import * as ModalActions from '../../../actions/show-modal.js'
import { Button, TextInput, MultiSelect, TextArea } from 'atoms'
import {
  containsErrorOrNull,
  getNameValidationState,
  getEmailValidationState,
  getSelectBoxValidationState,
  getPhoneValidationState,
  getEmailMatchValidationState
} from '../../../services/form-validation-helpers.js'
import OfficeContactSuccess from './office-contact-success'

/* 6/29/18: This class is deprecated and may not have full functionality due to the removal of redux for http requests */

function logGAEvent(category, action) {
  return logEvent({
    category,
    action,
    label: 'Office Contact Modal'
  })
}
class OfficeContactModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
      modalIsOpen: true,
      displayForm: true,
      userFullName: '',
      userEmailAddress: '',
      userTopic: '',
      userTopicLabel: '',
      userDetails: '',
      userOptIn: false,
      userPhoneNumber: null,
      showSuccess: false,
      officeName: props.officeName,
      officeLink: props.officeLink,
      addressObject: props.officeAddress,
      validStates: {
        userFullName: null,
        userEmailAddress: null,
        userTopic: null,
        userPhoneNumber: null,
        userConfirmEmailAddress: null
      }
    }
  }
  componentDidMount() {
    logModal('/local-assistance/Office Contact Modal')
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    const returnEmailValue = () => {
      if (name === 'userConfirmEmailAddress') {
        return this.state.userEmailAddress
      }
      return null
    }

    const validationState = validationFunction(
      name,
      this.state[name],
      defaultWhenNotSuccessful || null,
      returnEmailValue()
    )
    if (validationState[name] === 'error') {
      logGAEvent('User Error Event', `User failed form validation on ${name} field)`)
    }

    return validationState
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates

    if (includes(fields, 'userFullName')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getNameValidationState, 'userFullName', defaultWhenNotSuccessful)
      )
    }

    if (includes(fields, 'userEmailAddress')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getEmailValidationState, 'userEmailAddress', defaultWhenNotSuccessful)
      )
    }

    if (includes(fields, 'userConfirmEmailAddress')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(
          getEmailMatchValidationState,
          'userConfirmEmailAddress',
          defaultWhenNotSuccessful
        )
      )
    }

    if (includes(fields, 'userTopic')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getSelectBoxValidationState, 'userTopic', defaultWhenNotSuccessful)
      )
    }

    if (this.state.userPhoneNumber && includes(fields, 'userPhoneNumber')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getPhoneValidationState, 'userPhoneNumber', defaultWhenNotSuccessful)
      )
    }

    this.setState({ validStates: validStates })
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.validateFields(Object.keys(this.state.validStates), 'error')

    const { validStates } = this.state

    const hasErrors = Object.keys(validStates).filter(key => {
      return validStates[key] === 'error'
    })

    if (hasErrors.length) {
      return null
    }

    const formData = {
      userEmailAddress: this.state.userEmailAddress,
      userConfirmEmailAddress: this.state.userConfirmEmailAddress,
      userFullName: this.state.userFullName,
      userTopic: this.state.userTopicLabel,
      userDetails: this.state.userDetails,
      userPhoneNumber: this.state.userPhoneNumber,
      userOptIn: this.state.userOptIn,
      officeName: this.state.officeName,
      officeLink: this.state.officeLink,
      officeState: this.state.addressObject.state,
      officeZipCode: this.state.addressObject.zipCode,
      officeStreet: this.state.addressObject.street,
      officeCity: this.state.addressObject.city,
      officePhoneNumber: this.state.addressObject.phoneNumber
    }

    postMiscAction('office-contact-form', formData)

    if (formData.userOptIn) {
      logGAEvent('User Metrics', 'User opted into SBA Newsletter')
    }
    if (!isEmpty(formData.userPhoneNumber)) {
      logGAEvent('User Metrics', 'User added a phone number')
    }
    if (!isEmpty(formData.userDetails)) {
      logGAEvent(
        'User Metrics',
        `User added additional details (${formData.userDetails.length} characters)`
      )
    }
    logGAEvent('User Event', 'User successfully scheduled an appointment')
    logSet({
      officeName: formData.officeName,
      userTopic: formData.userTopic,
      detail_length: formData.userDetails.length
    })
    this.timerId = setTimeout(() => {
      this.setState({ showSuccess: true })
    }, 1200)
  }

  handleChange(e) {
    const newState = {}
    const name = e.target.name
    newState[name] = e.target.value
    this.setState(newState, () => this.validateFields([name]))
  }

  handleSelectChange(e) {
    const newState = {}
    newState.userTopic = e.value
    newState.userTopicLabel = e.label
    this.setState(newState, () => this.validateFields(['userTopic']))
  }

  handleCheckbox(e) {
    this.setState({
      userOptIn: e.target.checked
    })
  }

  handleCheckboxFocus(e) {
    this.setState({ checkboxFocus: true })
  }

  handleCheckboxBlur(e) {
    this.setState({ checkboxFocus: false })
  }

  handleKeyDown(e) {
    e.preventDefault()
    const code = e.keyCode ? e.keyCode : e.which
    if (code === 13) {
      logGAEvent('User Event', 'User left without scheduling an appointment')
      this.setState({ modalIsOpen: false })
    }
  }

  handleClose(e) {
    e.preventDefault()
    logGAEvent('User Event', 'User left without scheduling an appointment')
    this.props.modalActions.closeOfficeContactModal()
  }

  handleCheckboxKeyDown(e) {
    if (e.keyCode === 13) {
      this.setState({
        userOptIn: !this.state.userOptIn
      })
    }
  }

  render() {
    return (
      <RemoveScroll>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          className={styles.content}
          overlayClassName={styles.overlay}
          ariaHideApp={false}
          onRequestClose={this.handleClose.bind(this)}
          shouldCloseOnOverlayClick={false}
          contentLabel="Office Contact Form"
        >
          <div id="contactFormModal" aria-labelledby="dialogTitle" role="dialog" aria-modal="true">
            <div className={styles.imgContainer} onClick={this.handleClose.bind(this)}>
              <img
                className={styles.exitIcon}
                src={exitIcon}
                alt="close icon"
                onKeyDown={event => this.handleKeyDown(event)}
              />
            </div>
            {this.state.showSuccess ? (
              <OfficeContactSuccess modalActions={this.props.modalActions} />
            ) : (
              <form
                id="contactOfficeForm"
                onSubmit={e => this.handleSubmit(e)}
                noValidate="noValidate"
                className={styles.form}
              >
                <div>
                  <h2 id="dialogTitle" className={styles.title}>
                    Contact your District Office
                  </h2>
                  <h3 className={styles.officeName}>{this.state.officeName}</h3>
                  <div className={styles.divider} />
                </div>
                <TextInput
                  id="userFullName"
                  name="userFullName"
                  label="Full Name"
                  helperText="Required. Input your first and last name."
                  errorText="Required. Input your first and last name."
                  onChange={this.handleChange.bind(this)}
                  value={this.state.userFullName}
                  validationState={this.state.validStates.userFullName}
                  className={styles.input}
                  labelStyle={styles.label}
                  alternateError
                />
                <TextInput
                  id="userEmailAddress"
                  name="userEmailAddress"
                  label="Email"
                  helperText="Required. Input a valid email address format."
                  errorText="Required. Input a valid email address format."
                  onChange={this.handleChange.bind(this)}
                  value={this.state.userEmailAddress}
                  validationState={this.state.validStates.userEmailAddress}
                  className={styles.input}
                  labelStyle={styles.label}
                  alternateError
                />
                <TextInput
                  id="userConfirmEmailAddress"
                  name="userConfirmEmailAddress"
                  label="Confirm Email"
                  helperText="Required. Must match email address above. "
                  errorText="Required. Must match email address above. "
                  onChange={this.handleChange.bind(this)}
                  value={this.state.userConfirmEmailAddress}
                  validationState={this.state.validStates.userConfirmEmailAddress}
                  className={styles.input}
                  labelStyle={styles.label}
                  alternateError
                />
                <TextInput
                  id="userPhoneNumber"
                  name="userPhoneNumber"
                  inputType="tel"
                  label="Phone Number"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.userPhoneNumber}
                  validationState={this.state.validStates.userPhoneNumber}
                  className={styles.input}
                  labelStyle={styles.label}
                  helperText="Optional. Must be 10 numeric characters."
                  errorText="Optional. Must be 10 numeric characters."
                  alternateError
                />
                <MultiSelect
                  id="userTopic"
                  name="userTopic"
                  className={styles.topicDropdown + ' ' + styles.input}
                  labelStyle={styles.label}
                  reactSelectClassName={styles.reactSelect}
                  label="Topic"
                  value={this.state.userTopic}
                  validationState={this.state.validStates.userTopic}
                  searchable={false}
                  onChange={this.handleSelectChange.bind(this)}
                  placeholder={() => <div tabIndex="1" />}
                  helperText="Required. Select your topic from the provided options."
                  errorText="Required. Select your topic from the provided options."
                  options={[
                    { value: 'covid-19 relief', label: 'Covid-19 Relief Programs' },
                    {
                      value: 'government contracting',
                      label: 'Government Contracting'
                    },
                    { value: 'natural disasters', label: 'Natural Disasters' },
                    { value: 'other', label: 'Other' }
                  ]}
                  alternateError
                />
                <TextArea
                  id="userDetails"
                  name="userDetails"
                  className={styles.details}
                  labelStyle={styles.label}
                  label="Details"
                  helperText="Tell us more information about your inquiry."
                  onChange={this.handleChange.bind(this)}
                  value={this.state.userDetails}
                  maxLength="250"
                />
                <div className={styles.checkboxContainer} style={{ position: 'relative' }}>
                  <label htmlFor="optInCheckbox" className={styles.checkboxLabel}>
                    <Checkbox
                      id="optInCheckbox"
                      name="optInCheckbox"
                      tabIndex={'0'}
                      checked={this.state.userOptIn}
                      onKeyDown={this.handleCheckboxKeyDown.bind(this)}
                      onChange={this.handleCheckbox.bind(this)}
                      onFocus={e => {
                        this.handleCheckboxFocus(e)
                      }}
                      onBlur={e => {
                        this.handleCheckboxBlur(e)
                      }}
                      ariaLabel="Opt in to SBA email communications"
                      alternate
                    />{' '}
                    Opt in to SBA email communications
                  </label>
                </div>
                <div className={styles.btnContainer}>
                  <div className={styles.btnContent}>
                    <Button secondary onClick={this.handleClose.bind(this)}>
                      CANCEL
                    </Button>
                  </div>
                  <div className={styles.btnContent}>
                    <Button primary alternate type="submit" onClick={this.handleSubmit.bind(this)}>
                      SUBMIT
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </ReactModal>
      </RemoveScroll>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(ModalActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(OfficeContactModal)

export { OfficeContactModal }
