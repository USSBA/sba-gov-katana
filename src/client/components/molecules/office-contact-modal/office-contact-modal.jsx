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
import { Button, TextInput } from 'atoms'
import { logEvent } from '../../../services/analytics.js'
import {
  containsErrorOrNull,
  getEmailValidationState,
  getZipcodeValidationState
} from '../../../services/form-validation-helpers.js'

/* 6/29/18: This class is deprecated and may not have full functionality due to the removal of redux for http requests */
class OfficeContactModal extends React.Component {

  constructor(props) {
    super()
    this.state = {
      modalIsOpen: true,
      displayForm: true,
      fullName: '',
      email: '',
      topic: '',
      details: '',
      validStates: {
        fullName: null,
        email: null,
        topic: null,
        details: null,
      }
    }
  }

  // componentDidMount() {
  //   this.validateFields(['userEmailAddress', 'userZipCode'])
  //   window.scrollTo(0, 0)
  // }

  // validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
  //   const validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null)
  //   if (validationState[name] === 'error') {
  //     logEvent({
  //       category: 'Newsletter Modal',
  //       action: 'Error Event',
  //       label: name
  //     })
  //   }
  //   return validationState
  // }

  // validateFields(fields, defaultWhenNotSuccessful) {
  //   let validStates = this.state.validStates

  //   if (includes(fields, 'userEmailAddress')) {
  //     validStates = Object.assign(
  //       validStates,
  //       this.validateSingleField(getEmailValidationState, 'userEmailAddress', defaultWhenNotSuccessful)
  //     )
  //   }
  //   if (includes(fields, 'userZipCode')) {
  //     validStates = Object.assign(
  //       validStates,
  //       this.validateSingleField(getZipcodeValidationState, 'userZipCode', defaultWhenNotSuccessful)
  //     )
  //   }
  //   this.setState({ validStates: validStates })
  // }

  // isValidForm() {
  //   return !containsErrorOrNull(this.state.validStates)
  // }

  // handleSubmit(e) {
  //   e.preventDefault()
  //   //we do not care about the response
  //   runMiscAction('newsletter-registration', {
  //     userEmailAddress: this.state.userEmailAddress,
  //     userZipCode: this.state.userZipCode
  //   })

  //   this.setState({ displayForm: false })
  //   this.timerId = setTimeout(() => {
  //     this.setState({ modalIsOpen: false })
  //   }, 5000)
  // }

  // componentWillUnmount() {
  //   if (this.timerId !== null) {
  //     clearTimeout(this.timerId)
  //   }
  // }

  // handleChange(e) {
  //   const newState = {}
  //   const name = e.target.name
  //   newState[name] = e.target.value
  //   this.setState(newState, () => this.validateFields([name]))
  // }

  // handleKeyDown(event) {
  //   const code = event.keyCode ? event.keyCode : event.which
  //   if (code === 13) {
  //     this.setState({ modalIsOpen: false })
  //   }
  //   event.preventDefault()
  // }

  // handleBlur(e) {
  //   this.validateFields([e.target.name], 'error')
  // }

  // handleFocus(nameOrEvent) {
  //   const name =
  //     nameOrEvent && nameOrEvent.target && nameOrEvent.target.name ? nameOrEvent.target.name : nameOrEvent
  //   logEvent({
  //     category: 'Newsletter Modal',
  //     action: 'Focus Event',
  //     label: name
  //   })
  // }

  handleClose(event) {
    this.props.modalActions.closeOfficeContactModal()
    event.preventDefault()
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
        <div>
          <div>
            <a className={styles.imgContainer} onClick={this.handleClose.bind(this)} href="">
              <img
                className={styles.exitIcon}
                src={exitIcon}
                onKeyDown={event => this.handleKeyDown(event)}
              />
            </a>
            <h3 id="dialogTitle" className={styles.title}>
              Contact your CITY District Office
            </h3>
            <div className={styles.divider} />
          </div>
          <div>
            <TextInput
              id="zip"
              queryParamName="address"
              textRef={this.textInput}
              className={styles.field + ' ' + styles.zip}
              label="Full Name"
              helperText="Required. Input your first and last name."
              errorText="Enter a 5-digit zip code."
            />
          </div>
          <div>
            <TextInput
              id="zip"
              queryParamName="address"
              textRef={this.textInput}
              className={styles.field + ' ' + styles.zip}
              label="Email"
              helperText="Required. Input a valid email address format."
              errorText="Enter a 5-digit zip code."
            />
          </div>
          <div>
            <TextInput
              id="zip"
              queryParamName="address"
              textRef={this.textInput}
              className={styles.field + ' ' + styles.zip}
              label="Topics"
              helperText="Required. Select your topic from the provided options."
              errorText="Enter a 5-digit zip code."
            />
          </div>
          <div>
            <TextInput
              id="zip"
              queryParamName="address"
              textRef={this.textInput}
              className={styles.field + ' ' + styles.zip}
              label="Details"
              helperText="Tell us more information about your inquirry or accomodations."
              errorText="Enter a 5-digit zip code."
            />
          </div>
          <div className={styles.btnContainer}>
            {/*<Button disabled={!this.isValidForm()} primary small type="submit">
              Subscribe
            </Button>*/}
            <Button secondary>CANCEL</Button>
            <Button primary>SUBMIT</Button>
          </div>
        </div>
      </ReactModal>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(ModalActions, dispatch)
  }
}
export default connect(mapDispatchToProps)(OfficeContactModal)

export { OfficeContactModal }
