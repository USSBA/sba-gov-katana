import React from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { includes } from 'lodash'
import { runMiscAction } from '../../../fetch-content-helper.js'
import constants from '../../../services/constants.js'
import config from '../../../services/client-config.js'
import envelopeIcon from 'assets/svg/envelope.svg'
import exitIcon from 'assets/svg/close_button.svg'
import styles from './office-contact-modal.scss'
import * as ModalActions from '../../../actions/show-modal.js'
import { Button, TextInput, MultiSelect, TextArea } from 'atoms'
import { logEvent } from '../../../services/analytics.js'
import { containsErrorOrNull, getNameValidationState, getEmailValidationState } from '../../../services/form-validation-helpers.js'
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
      userDetails: '',
      showSuccess: false,
      officeName: props.officeName,
      validStates: {
        userFullName: null,
        userEmailAddress: null,
        userTopic: null,
      }
    }
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    const validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null)
    if (validationState[name] === 'error') {
      logEvent({
        category: 'Newsletter Modal',
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

    console.log(validStates)

    this.setState({ validStates: validStates })
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.validateFields(Object.keys(this.state.validStates), 'error')
    //we do not care about the response
    // runMiscAction('newsletter-registration', {
    //   userEmailAddress: this.state.userEmailAddress,
    //   userZipCode: this.state.userZipCode
    // })

    // this.setState({ displayForm: false })
    // this.timerId = setTimeout(() => {
    //   this.setState({ modalIsOpen: false })
    // }, 5000)
  }

  handleChange(e) {
    const newState = {}
    const name = e.target.name
    newState[name] = e.target.value
    this.setState(newState, () => this.validateFields([name]))
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
          <img
            className={styles.exitIcon}
            src={exitIcon}
            onKeyDown={event => this.handleKeyDown(event)}
          />
        </a>
        {this.state.showSuccess ? (
          <OfficeContactSuccess modalActions={this.props.modalActions} />
        ) : (
          <form onSubmit={e => this.handleSubmit(e)} novalidate="novalidate" className={styles.form}>
            <div>
              <h3 id="dialogTitle" className={styles.title}>
                Contact your {this.state.officeName} Office
              </h3>
              <div className={styles.divider} />
            </div>
            <TextInput
              name="userFullName"
              queryParamName="userFullName"
              textRef={this.textInput}
              label="Full Name"
              helperText="Required. Input your first and last name."
              errorText="Required. Input your first and last name."
              onChange={this.handleChange.bind(this)}
              value={this.state.userFullName}
              validationState={this.state.validStates.userFullName}
            />
            <TextInput
              name="userEmailAddress"
              queryParamName="userEmailAddress"
              textRef={this.textInput}
              label="Email"
              helperText="Required. Input a valid email address format."
              errorText="Required. Input a valid email address format."
              onChange={this.handleChange.bind(this)}
              value={this.state.userEmailAddress}
              validationState={this.state.validStates.userEmailAddress}
            />
            <MultiSelect
              name="form-field-name"
              className={styles.topicDropdown}
              reactSelectClassName={styles.reactSelect}
              label="Topic"
              value={this.state.userTopic}
              onChange={this.handleChange.bind(this)}
              helperText="Required. Select your topic from the provided options."
              errorText="Required. Select your topic from the provided options."
              options={[
                { value: 'general inquiry', label: 'General Inquiry' },
                { value: '8(a) offer letter', label: '8(a) Offer Letter' },
                { value: 'media', label: 'Media' },
                { value: 'covid-19', label: 'Covid-19' },
                { value: 'disaster relief', label: 'Disaster Relief' },
              ]}
            />
            <TextArea
              name="userDetails"
              queryParamName="userDetails"
              textRef={this.textInput}
              className={styles.details}
              label="Details"
              helperText="Tell us more information about your inquirry or accomodations."
              onChange={this.handleChange.bind(this)}
              value={this.state.userDetails}
              maxLength="250"
            />
            <div className={styles.btnContainer}>
              <Button secondary onClick={this.handleClose.bind(this)}>
                CANCEL
              </Button>
              <Button primary type="submit">SUBMIT</Button>
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
