import React from "react";
import Modal from 'react-modal'
import styles from './modal.scss'
import sbaLogo from '../../../../public/assets/images/logo.png';
import exitIcon from '../../../../public/assets/svg/exit-modal-close.svg';

class SbaModal extends React.Component {
  render() {
    let logo = this.props.showLogo ? (<img className={styles.logo} src={sbaLogo}/>) : undefined;
    return (
      <Modal isOpen={true} className={styles.content} overlayClassName={styles.overlay}>
        {logo}
        <a onClick={this.props.onClose}><img className={styles.exitIcon} src={exitIcon}/></a>
        <h2 className={styles.title}>{this.props.title}</h2>
        <div className={styles.divider}></div>
        <p className={styles.text}>{this.props.text}</p>
        {this.props.children}
        <div className={styles.btnContainer}>
          <button onClick={this.props.onClose} className={styles.btnCancel}>{this.props.cancelButtonText}</button>
          <button onClick={this.props.onClickOk} className={styles.btnContinue}>{this.props.okButtonText}</button>
        </div>
      </Modal>
    );
  }
}

SbaModal.propTypes = {
  cancelButtonText: React.PropTypes.string,
  okButtonText: React.PropTypes.string,
  showCancel: React.PropTypes.boolean,
  showOk: React.PropTypes.boolean,
  title: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  showLogo: React.PropTypes.boolean,
  onClickOk: React.PropTypes.func,
  onClose: React.PropTypes.func
}

SbaModal.defaultProps ={
  cancelButtonText: "Cancel",
  okButtonText: "OK",
  showCancel: true,
  showOk: true,
  title: "Sample Modal Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  showLogo: false,
  onClickOk: function() {
    console.log("Clicked OK")
  }
}

export default SbaModal;
