import React from "react";
import Modal from "react-modal";
import {
  SmallGreySecondaryButton,
  SmallPrimaryButton
} from "atoms";
import sbaLogo from "../../../../public/assets/images/logo.png";
import ModalCloseIcon from "../../../../public/assets/svg/modal-close-icon.svg";
import styles from "./modal.scss";

class SbaModal extends React.Component {

  handleEnter(e){
    if(e.keyCode == 13){
      this.props.onClose()
    }
  }

  render() {
    let logo = this.props.showLogo ? (<img className={styles.logo} src={sbaLogo}/>) : undefined;
    return (
      <Modal isOpen={true} className={styles.content} overlayClassName={styles.overlay}>
        {logo}
        <img tabIndex={0} onClick={this.props.onClose} onKeyDown={(e) => {this.handleEnter(e)}} className={styles.closeIcon} src={ModalCloseIcon}/>
        <h3 className={styles.title}>{this.props.title}</h3>
        <div className={styles.divider}></div>
        <p className={styles.text}>{this.props.text}</p>
        {this.props.children}
        <div className={styles.btnContainer}>
          <SmallPrimaryButton onClick={this.props.onClickOk} text={this.props.okButtonText} />
          <SmallGreySecondaryButton onClick={this.props.onClose} text={this.props.cancelButtonText} />
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
  onClickOk: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func
}

SbaModal.defaultProps ={
  cancelButtonText: "Wait no",
  okButtonText: "Yes",
  showCancel: true,
  showOk: true,
  title: "Sample Modal Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui.",
  showLogo: false,
  onClickOk: function() {
    console.error("Please override the click ok function")
  }
}

export default SbaModal;
