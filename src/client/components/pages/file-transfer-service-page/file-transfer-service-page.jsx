import React, { Component } from 'react'
import axios from 'axios'
import { Button, FileUploader, MultiSelect, TextArea, TextInput } from 'atoms'
import styles from './file-transfer-service-page.scss'

function getBase64(file) {
  return new Promise(function(resolve) {
    var reader = new FileReader()
    reader.onloadend = function() {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

class FileTransferServicePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      message: '',
      emailRecipient: '',
      subject: 'File(s) Ready for Download...',
      fullName: '',
      emailSender: ''
    }
  }

  async postFormData() {
    const url = 'placeholder'

    if (this.state.files.length > 0) {
      try {
        await axios.post(url, this.state)
      } catch (error) {
        throw error
      }
    }
  }

  mapFilesToBase64(files) {
    const base64Files = files.map(file => getBase64(file))

    Promise.all(base64Files).then(convertedFiles => this.setState({ files: convertedFiles }))
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>File Transfer Service</h1>
        <p>
          All files sent through this page is transmitted using 128-bit encryption. After successful upload
          of selected files(s) an email notification will be sent to the selected recipient and will be
          handled accordingly.
        </p>
        <h2>Email</h2>
        <form>
          <div className={styles.to}>
            <MultiSelect
              data-testid="recipient-email"
              id="recipient-email"
              label="To"
              onChange={e => this.setState({ emailRecipient: e.value })}
              options={[{ value: 'test@sba.gov', label: 'test@sba.gov' }]}
              value={this.state.emailRecipient}
            />
          </div>
          <TextInput
            className={styles.subject}
            data-testid="subject"
            id="subject"
            label="Subject"
            onChange={({ target: { value } }) => this.setState({ subject: value })}
          />
          <TextArea
            className={styles.message}
            data-testid="message"
            id="message"
            label="Message"
            onChange={e => this.setState({ message: e.target.value })}
            value={this.state.message}
          />
          <h2>Attach files</h2>
          <div data-testid="file-uploader">
            <FileUploader
              onChange={files => {
                this.mapFilesToBase64(files.files)
              }}
            />
          </div>
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
          />
          <TextInput
            className={styles.subject}
            data-testid="sender-email"
            id="sender-email"
            label="Email address"
            onChange={({ target: { value } }) => this.setState({ emailSender: value })}
          />
          <Button
            aria-label="Send files"
            data-testid="send-button"
            onClick={event => this.postFormData()}
            primary
          >
            Send files
          </Button>
        </form>
      </div>
    )
  }
}

export default FileTransferServicePage
