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
import { Button, TextInput, TextArea } from 'atoms'
import { logEvent } from '../../../services/analytics.js'
import { containsErrorOrNull, getEmailValidationState } from '../../../services/form-validation-helpers.js'

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
      officeName: props.officeName,
      validStates: {
        fullName: null,
        userEmailAddress: null,
        userTopic: null,
        userDetails: null
      }
    }
  }

  componentDidMount() {
    this.validateFields(['userEmailAddress'])
    window.scrollTo(0, 0)
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

    if (includes(fields, 'userEmailAddress')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getEmailValidationState, 'userEmailAddress', defaultWhenNotSuccessful)
      )
    }

    this.setState({ validStates: validStates })
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates)
  }

  handleSubmit(e) {
    console.log(e)
    // e.preventDefault()
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

  // componentWillUnmount() {
  //   if (this.timerId !== null) {
  //     clearTimeout(this.timerId)
  //   }
  // }

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

  handleBlur(e) {
    this.validateFields([e.target.name], 'error')
  }

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
        <form>
          <div>
            <a className={styles.imgContainer} onClick={this.handleClose.bind(this)} href="">
              <img
                className={styles.exitIcon}
                src={exitIcon}
                onKeyDown={event => this.handleKeyDown(event)}
              />
            </a>
            <h3 id="dialogTitle" className={styles.title}>
              Contact your {this.state.officeName} Office
            </h3>
            <div className={styles.divider} />
          </div>
          <div>
            <TextInput
              name="userFullName"
              queryParamName="userFullName"
              textRef={this.textInput}
              className={styles.field}
              label="Full Name"
              helperText="Required. Input your first and last name."
              errorText="Required. Input your first and last name."
              onChange={this.handleChange.bind(this)}
              value={this.state.userFullName}
              validationState={this.state.validStates.userFullName}
              onBlur={this.handleBlur.bind(this)}
            />
          </div>
          <div>
            <TextInput
              name="userEmailAddress"
              queryParamName="userEmailAddress"
              textRef={this.textInput}
              className={styles.field}
              label="Email"
              helperText="Required. Input a valid email address format."
              errorText="Required. Input a valid email address format."
              onChange={this.handleChange.bind(this)}
              value={this.state.userEmailAddress}
              validationState={this.state.validStates.userEmailAddress}
              onBlur={this.handleBlur.bind(this)}
            />
          </div>
          <div>
            <TextInput
              name="userTopic"
              queryParamName="userTopic"
              textRef={this.textInput}
              className={styles.field}
              label="Topics"
              helperText="Required. Select your topic from the provided options."
              errorText="Required. Select your topic from the provided options."
              onChange={this.handleChange.bind(this)}
              value={this.state.userTopic}
              validationState={this.state.validStates.userTopic}
              onBlur={this.handleBlur.bind(this)}
            />
          </div>
          <div>
            <TextArea
              name="userDetails"
              queryParamName="userDetails"
              textRef={this.textInput}
              className={styles.field}
              label="Details"
              helperText="Tell us more information about your inquirry or accomodations."
              errorText="Tell us more information about your inquirry or accomodations."
              onChange={this.handleChange.bind(this)}
              value={this.state.userDetails}
              validationState={this.state.validStates.userDetails}
              style={{ height: '100px' }}
              onBlur={this.handleBlur.bind(this)}
              maxLength="250"
            />
          </div>
          <div className={styles.btnContainer}>
            {/*<Button disabled={!this.isValidForm()} primary small type="submit">
              Subscribe
            </Button>*/}
            <Button secondary onClick={this.handleClose.bind(this)}>
              CANCEL
            </Button>
            <Button primary>SUBMIT</Button>
          </div>
        </form>
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
