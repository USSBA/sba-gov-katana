import React from 'react'

import styles from './leave-sba-modal.scss'
import { Link } from 'atoms'
import { SbaModal } from 'molecules'

class LeaveSbaModal extends React.Component {
  continueLink() {
    this.props.closeLeaveSba()
    document.location = this.props.url
  }

  render() {
    const { closeLeaveSba, url, isOpen } = this.props

    const title = "You're leaving the Small Business Administration website."
    const text =
      'This link is provided for your reference only. The SBA doesn’t endorse non-government websites, companies, or applications. The SBA doesn’t attest to the accuracy of information provided by third-parties and other linked sites.'

    return (
      <SbaModal
        showLogo={true}
        title={title}
        text={text}
        cancelButtonText="CANCEL"
        okButtonText="CONTINUE"
        onClose={closeLeaveSba}
        onClickOk={this.continueLink.bind(this)}
        isOpen={isOpen}
        showCancel={true}
      >
        <div className={styles.linkContainer}>
          <span>Link to website:</span>
          <br />
          <Link to={url}>{url}</Link>
        </div>
      </SbaModal>
    )
  }
}

export default LeaveSbaModal
