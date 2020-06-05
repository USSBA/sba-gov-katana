import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Button, FileUploader, MultiSelect, TextArea, TextInput, Loader } from 'atoms'
import styles from './file-transfer-service-page.scss'

const FORM_STATE = {
  processing: 'processing',
  success: 'success',
  error: 'error'
}


const origState = {
  contactEmail: '',
  fullName: '',
  files: [],
  loanServiceCenterId: '',
  message: '',
  multiSelectOptions: [],
  shouldShowFileUploader: true,
  showEmptyFileUploaderError: false,
  subject: ''
}

function stripDataURLHeaders(fileAsDataURL) {
  return fileAsDataURL.split(',')[1]
}

async function createBase64FileData(file) {
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onloadend = function() {
      const fileData = {
        base64: stripDataURLHeaders(reader.result),
        filename: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type
      }
      resolve(fileData)
    }

    reader.readAsDataURL(file)
  })
}

class FileTransferServicePage extends Component {
  constructor(props) {
    super(props)
    this.fileUploaderRef = React.createRef()

    this.state = {
      formProcessingState: null,
      ...origState
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/loan-processing')
    const multiSelectOptions = data.map(({ id, name }) => ({ value: id, label: name }))
    this.setState({ multiSelectOptions })
  }

  async submitForm(e) {
    e.preventDefault()
    const { contactEmail, files, formProcessingState, fullName, loanServiceCenterId, message, subject } = this.state
    if (files.length > 0) {
      this.setState({ formProcessingState: FORM_STATE.processing })
      window.scrollTo(0, 0)
      const url = '/api/loan-processing'
      const formData = Object.assign(
          {},
          {
            contactEmail,
            files,
            fullName,
            folderName: `submission-${Date.now()}`,
            loanServiceCenterId,
            message,
            subject
          }
        )

      await axios
        .post(url, formData)
        .then(response => {
          const statusCode = 204
          this.setState({
            formProcessingState: response.status === statusCode ? FORM_STATE.success : FORM_STATE.error
          })
          if (formProcessingState === FORM_STATE.success) {
            this.resetForm()
          }
        })
        .catch(error => {
          this.setState({ formProcessingState: FORM_STATE.error })
        })
    } else {
      window.scrollTo(0, this.fileUploaderRef.current.offsetTop)
      this.setState({ showEmptyFileUploaderError: true })
    }
  }

  resetForm() {
    // Resetting the state to its original state and using shouldShowFileUploader to render a new FileUploader section
    this.setState({ ...origState, shouldShowFileUploader: false }, () => {
      this.setState({ shouldShowFileUploader: true })
    })
  }

  mapFilesToBase64(files) {
    const base64Files = files.map(createBase64FileData)
    return Promise.all(base64Files).then(convertedFiles => this.setState({ files: convertedFiles }))
  }

  render() {
    let formContent

    const { formProcessingState } = this.state

    switch (formProcessingState) {
      case FORM_STATE.success:
        formContent = (
          <div className={styles[formProcessingState]}>
            <i className="fa fa-check-circle" data-testid="newsletter-success-icon" />
            <h3 data-testid="newsletter-success-title">Success!</h3>
            <p data-testid="newsletter-success-message">We have received your documents.</p>
          </div>
        )
        break
      case FORM_STATE.error:
        formContent = (
          <div className={styles[formProcessingState]} data-testid="newsletter-error-info">
            <i className="fa fa-times-circle" data-testid="newsletter-error-icon" />
            <h3 data-testid="newsletter-error-title">Oops something went wrong…</h3>
            <p data-testid="newsletter-error-message">
              We were unable to receive your documents. Please check your document format and submit again.
            </p>
          </div>
        )
        break
      case FORM_STATE.processing:
        formContent = (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )
        break
    }

    return (
      <div className={styles.container}>
        {formContent}

        <h1>File Transfer Service</h1>
        <p>
          All files sent through this page is transmitted using 128-bit encryption. After successful upload
          of selected files(s) an email notification will be sent to the selected recipient and will be
          handled accordingly.
        </p>
        <h2>Email</h2>
        <form onSubmit={event => this.submitForm(event)}>
          <div className={styles.to}>
            <MultiSelect
              data-testid="recipient-email"
              id="recipient-email"
              label="To"
              onChange={e => this.setState({ loanServiceCenterId: e.value })}
              options={this.state.multiSelectOptions}
              value={this.state.loanServiceCenterId}
            />
          </div>
          <TextInput
            className={styles.subject}
            data-testid="subject"
            id="subject"
            label="Subject"
            onChange={({ target: { value } }) => this.setState({ subject: value })}
            value={this.state.subject}
          />
          <TextArea
            className={styles.message}
            data-testid="message"
            id="message"
            label="Message"
            onChange={e => this.setState({ message: e.target.value })}
            value={this.state.message}
          />
          {this.state.shouldShowFileUploader && (
            <Fragment>
              <h2 ref={this.fileUploaderRef}>Attach files</h2>
              <div data-testid="file-uploader">
                <FileUploader
                  id="file-uploader"
                  onChange={files => {
                    this.mapFilesToBase64(files.files)
                    this.setState({ showEmptyFileUploaderError: false })
                  }}
                />
              </div>
              {this.state.showEmptyFileUploaderError && (
                <p className={styles.uploadFileError}>Please upload a file.</p>
              )}
            </Fragment>
          )}
          <h2>Contact information</h2>
          <p>
            Please provide us with your contact information in case there are any issues or if we have
            questions.
          </p>
          <TextInput
            className={styles.subject}
            data-testid="full-name"
            id="full-name"
            label="Full name"
            onChange={({ target: { value } }) => this.setState({ fullName: value })}
            value={this.state.fullName}
          />
          <TextInput
            className={styles.subject}
            data-testid="sender-email"
            id="sender-email"
            inputType="email"
            label="Email address"
            onChange={({ target: { value } }) => this.setState({ contactEmail: value })}
            value={this.state.contactEmail}
          />
          <Button aria-label="Send files" data-testid="send-button" primary type="submit">
            Send files
          </Button>
        </form>
      </div>
    )
  }
}

export default FileTransferServicePage
