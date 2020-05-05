import Fuse from 'fuse.js'
import React, { Component } from 'react'
import Select from 'react-select-v1'
import classNames from 'classnames'
import { isEmpty, isEqual, isNil } from 'lodash'
import { Button, Link, Loader, MultiSelect, TextArea, TextInput } from 'atoms'
import styles from './file-transfer-service-page.scss'

class FileTransferServicePage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h2>File Transfer Service</h2>
        <p>
          All files sent through this page is transmitted using 128-bit encryption. After successful upload
          of selected files(s) an email notification will be sent to the selected recipient and will be
          handled accodingly.
        </p>
        <h3>Email</h3>
        <form>
          <div className={styles.to}>
            <MultiSelect
              id="to"
              label="To"
              //onChange={({ value }) => this.setState({ office: value })}
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
          <TextArea className={styles.message} id="message" label="Mesage" />
        </form>
      </div>
    )
  }
}

export default FileTransferServicePage
