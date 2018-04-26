import Modal from 'react-modal'
import React, { PropTypes } from 'react'

import ModalCloseIcon from 'assets/svg/modal-close-icon.svg'
import sbaLogo from 'assets/images/logo.png'
import styles from './sba-modal.scss'
import { Button } from 'atoms'

class SbaModal extends React.Component {
  handleEnter(e) {
    if (e.keyCode == 13) {
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
      title
    } = this.props

    let logo = showLogo ? <img className={styles.logo} src={sbaLogo} /> : undefined
    return (
      <Modal isOpen={true} className={styles.content} overlayClassName={styles.overlay}>
        <img
          tabIndex={0}
          onClick={onClose}
          onKeyDown={e => {
            this.handleEnter(e)
          }}
          className={styles.closeIcon}
          src={ModalCloseIcon}
        />
        {logo}
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.divider} />
        <p className={styles.text}>{text}</p>
        {children}
        <div className={styles.btnContainer}>
          <Button onClick={onClickOk} primary small>
            {okButtonText}
          </Button>
          <Button onClick={onClose} secondary small>
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
  showCancel: PropTypes.boolean,
  showOk: PropTypes.boolean,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  showLogo: PropTypes.boolean,
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
