import Fuse from 'fuse.js'
import React, { Component } from 'react'
import Select from 'react-select-v1'
import classNames from 'classnames'
import { isEmpty, isEqual, isNil } from 'lodash'
import { Button, FileUploader, Link, Loader, MultiSelect, TextArea, TextInput } from 'atoms'
import styles from './file-transfer-service-page.scss'

class FileTransferServicePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filesValue: [],
      textAreaValue: {}
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <h1>File Transfer Service</h1>
        <p>
          All files sent through this page is transmitted using 128-bit encryption. After successful upload
          of selected files(s) an email notification will be sent to the selected recipient and will be
          handled accodingly.
        </p>
        <h2>Email</h2>
        <form>
          <div className={styles.to}>
            <MultiSelect
              id="to"
              label="To"
              //onChange={ e => console.log(e)}
              //options={this.officeOptions}
              //value={office}
            />
          </div>
          <TextInput
            className={styles.subject}
            data-cy="subject"
            id="subject"
            label="Subject"
            //onChange={({ target: { value } }) => this.setState({ search: value })}
            //placeholder="Search by name, title, or office"
            //value={search}
            //showSearchIcon={true}
          />
          <TextArea
            className={styles.message}
            id="message"
            label="Mesage"
            onChange={ e => this.setState({ textAreaValue: e }) }
          />
          <h2>Attach files</h2>
          <div data-testid="file-uploader">
            <FileUploader label="File upload area" onChange={ files => this.setState({ filesValue: files }) }/>
          </div>
          <h2>Contact information</h2>
          <p>Please provide us with your contact information in case there are any issues or if we have questions.</p>
          <TextInput
            className={styles.subject}
            data-cy="fullname"
            id="fullname"
            label="Full name"
            //onChange={({ target: { value } }) => this.setState({ search: value })}
            //placeholder="Search by name, title, or office"
            //value={search}
            //showSearchIcon={true}
          />
          <TextInput
            className={styles.subject}
            data-cy="email"
            id="email"
            label="Email address"
            //onChange={({ target: { value } }) => this.setState({ search: value })}
            //placeholder="Search by name, title, or office"
            //value={search}
            //showSearchIcon={true}
          />
          <Button aria-label="Send files" primary>Send files</Button>
        </form>
      </div>
    )
  }
}

export default FileTransferServicePage
