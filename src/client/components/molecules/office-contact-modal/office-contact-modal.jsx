import React from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { includes } from 'lodash'
import { runMiscAction, postMiscAction } from '../../../fetch-content-helper.js'
import constants from '../../../services/constants.js'
import config from '../../../services/client-config.js'
import envelopeIcon from 'assets/svg/envelope.svg'
import exitIcon from 'assets/svg/close_button.svg'
import styles from './office-contact-modal.scss'
import * as ModalActions from '../../../actions/show-modal.js'
import { Button, TextInput, MultiSelect, TextArea } from 'atoms'
import { logEvent } from '../../../services/analytics.js'
import {
  containsErrorOrNull,
  getNameValidationState,
  getEmailValidationState,
  getSelectBoxValidationState
} from '../../../services/form-validation-helpers.js'
import OfficeContactSuccess from './office-contact-success'

/* 6/29/18: This class is deprecated and may not have full functionality due to the removal of redux for http requests */
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
      showSuccess: false,
      officeName: props.officeName,
      addressObject: props.officeAddress,
      validStates: {
        userFullName: null,
        userEmailAddress: null,
        userTopic: null
      }
    }
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    const validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null)
    if (validationState[name] === 'error') {
      logEvent({
        category: 'Office Contact Modal',
        action: 'Error Event',
        label: name
      })
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

    if (includes(fields, 'userTopic')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getSelectBoxValidationState, 'userTopic', defaultWhenNotSuccessful)
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
    const formData = {
      userEmailAddress: this.state.userEmailAddress,
      userFullName: this.state.userFullName,
      userTopic: this.state.userTopicLabel,
      userDetails: this.state.userDetails,
      officeName: this.state.officeName,
      officeState: this.state.addressObject.state,
      officeZipCode: this.state.addressObject.zipCode,
      officeStreet: this.state.addressObject.street,
      officeCity: this.state.addressObject.city,
      officePhoneNumber: this.state.addressObject.phoneNumber
    }
    console.log(formData)
    const response = postMiscAction('office-contact-form', formData)
    console.log(response)
    this.setState({ modalIsOpen: false })
    this.timerId = setTimeout(() => {
      this.setState({ modalIsOpen: true })
      this.setState({ showSuccess: true })
    }, 1000)
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

  handleKeyDown(event) {
    const code = event.keyCode ? event.keyCode : event.which
    if (code === 13) {
      this.setState({ modalIsOpen: false })
    }
    event.preventDefault()
  }

  handleClose(event) {
    event.preventDefault()
    this.props.modalActions.closeOfficeContactModal()
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.modalIsOpen}
        className={styles.content}
        overlayClassName={styles.overlay}
        role="dialog"
        aria-labelledby="dialogTitle"
        contentLabel="Modal"
      >
        <a className={styles.imgContainer} onClick={this.handleClose.bind(this)} href="">
          <img className={styles.exitIcon} src={exitIcon} onKeyDown={event => this.handleKeyDown(event)} />
        </a>
        {this.state.showSuccess ? (
          <OfficeContactSuccess modalActions={this.props.modalActions} />
        ) : (
          <form onSubmit={e => this.handleSubmit(e)} noValidate="noValidate" className={styles.form}>
            <div>
              <h2 id="dialogTitle" className={styles.title}>
                Contact your District Office
              </h2>
              <h3 className={styles.officeName}>{this.state.officeName}</h3>
              <div className={styles.divider} />
            </div>
            <TextInput
              name="userFullName"
              label="Full Name"
              helperText="Required. Input your first and last name."
              errorText="Required. Input your first and last name."
              onChange={this.handleChange.bind(this)}
              value={this.state.userFullName}
              validationState={this.state.validStates.userFullName}
              className={styles.input}
              labelStyle={styles.label}
            />
            <TextInput
              name="userEmailAddress"
              label="Email"
              helperText="Required. Input a valid email address format."
              errorText="Required. Input a valid email address format."
              onChange={this.handleChange.bind(this)}
              value={this.state.userEmailAddress}
              validationState={this.state.validStates.userEmailAddress}
              className={styles.input}
              labelStyle={styles.label}
            />
            <MultiSelect
              name="userTopic"
              className={styles.topicDropdown + ' ' + styles.input}
              labelStyle={styles.label}
              reactSelectClassName={styles.reactSelect}
              label="Topic"
              value={this.state.userTopic}
              validationState={this.state.validStates.userTopic}
              onChange={this.handleSelectChange.bind(this)}
              helperText="Required. Select your topic from the provided options."
              errorText="Required. Select your topic from the provided options."
              options={[
                { value: 'covid-19 relief', label: 'Covid-19 Relief' },
                { value: 'disaster relief', label: 'Disaster Relief' },
                { value: 'consulting', label: 'Consulting' },
                { value: 'financial assistance', label: 'Financial Assistance' },
                {
                  value: 'procurement & government contracting',
                  label: 'Procurement & Government Contracting'
                },
                { value: 'other', label: 'Other' }
              ]}
            />
            <TextArea
              name="userDetails"
              className={styles.details}
              labelStyle={styles.label}
              label="Details"
              helperText="Tell us more information about your inquiry"
              onChange={this.handleChange.bind(this)}
              value={this.state.userDetails}
              maxLength="250"
            />
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
      </ReactModal>
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
