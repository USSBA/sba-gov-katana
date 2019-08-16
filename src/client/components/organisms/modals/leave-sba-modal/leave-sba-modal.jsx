import React from 'react'
import PropTypes from 'prop-types'

import styles from './leave-sba-modal.scss'
import { Link } from 'atoms'
import { SbaModal } from 'molecules'

class LeaveSbaModal extends React.Component {
  componentWillReceiveProps(props) {
    const { isOpen } = props
    if (isOpen) {
      const escapeKeyCode = 27
      this.closeModal = e => {
        if (e.keyCode === escapeKeyCode) {
          this.props.closeLeaveSba()
          document.removeEventListener('keydown', this.closeModal)
        }
      }
      document.addEventListener('keydown', this.closeModal)
    }
  }

  continueLink() {
    this.props.closeLeaveSba()
    document.location = this.props.url
  }

  continueLinkNewWindow() {
    this.props.closeLeaveSba()
    window.open(this.props.url)
  }

  renderLink() {
    const { shouldOpenNewWindow, url } = this.props
    const onClick = shouldOpenNewWindow ? () => this.continueLinkNewWindow() : () => this.continueLink()

    return (
      <Link onClick={onClick} data-cy="external url">
        {url}
      </Link>
    )
  }

  render() {
    const { closeLeaveSba, isOpen, shouldOpenNewWindow } = this.props

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
        onClickOk={
          shouldOpenNewWindow ? this.continueLinkNewWindow.bind(this) : this.continueLink.bind(this)
        }
        isOpen={isOpen}
        showCancel={true}
      >
        <div className={styles.linkContainer}>
          <span tabIndex="0">Link to website:</span>
          <br />
          {this.renderLink()}
        </div>
      </SbaModal>
    )
  }
}

LeaveSbaModal.defaultProps = {
  shouldOpenNewWindow: false
}

LeaveSbaModal.propTypes = {
  shouldOpenNewWindow: PropTypes.bool
}

export default LeaveSbaModal
