import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import ModalCloseIcon from 'assets/svg/modal-close-icon.svg'
import sbaLogo from 'assets/images/logo.png'
import styles from './sba-modal.scss'
import { Button } from 'atoms'

export class SbaModal extends React.Component {
  handleEnter(e) {
    const enterKeyCode = 13
    if (e.keyCode === enterKeyCode) {
      this.props.onClose()
    }
  }

  render() {
    const {
      cancelButtonText,
      children,
      okButtonText,
      onClickOk,
      onClose,
      showLogo,
      text,
      title,
      isOpen
    } = this.props

    const logo = showLogo ? <img className={styles.logo} src={sbaLogo} aria-hidden="true" /> : null
    return (
      <Modal
        isOpen={isOpen}
        className={styles.content}
        overlayClassName={styles.overlay}
        contentLabel={title}
        role="alertdialog"
        aria-labelledby="alertTitle"
        aria-describedby="alertText"
      >
        <img
          tabIndex={0}
          onClick={onClose}
          onKeyDown={e => {
            this.handleEnter(e)
          }}
          className={styles.closeIcon}
          src={ModalCloseIcon}
          data-cy="close button"
          aria-label="Close this modal."
        />
        {logo}
        <h3 data-cy="title" id="alertTitle" tabIndex="0" className={styles.title}>
          {title}
        </h3>
        <div className={styles.divider} />
        <p data-cy="message text" id="alertText" tabIndex="0" className={styles.text}>
          {text}
        </p>
        {children}
        <div className={styles.btnContainer}>
          <Button onClick={onClickOk} primary small data-cy="ok button">
            {okButtonText}
          </Button>
          <Button onClick={onClose} secondary small data-cy="cancel button">
            {cancelButtonText}
          </Button>
        </div>
      </Modal>
    )
  }
}

SbaModal.propTypes = {
  cancelButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
  showCancel: PropTypes.bool,
  showOk: PropTypes.bool,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  showLogo: PropTypes.bool,
  onClickOk: PropTypes.func.isRequired,
  onClose: PropTypes.func
}

SbaModal.defaultProps = {
  cancelButtonText: 'Wait no',
  okButtonText: 'Yes',
  showCancel: true,
  showOk: true,
  title: 'Sample Modal Title',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui.',
  showLogo: false,
  onClickOk: function() {
    console.error('Please override the click ok function')
  }
}

export default SbaModal
