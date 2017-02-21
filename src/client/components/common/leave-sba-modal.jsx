import React from "react";
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ModalActions from '../../actions/show-modal.js'
import styles from '../../styles/modals/leave-sba-modal.scss'
import sbaLogo from '../../../../public/assets/images/logo.png';
import exitIcon from '../../../../public/assets/svg/exit-modal-close.svg';

class LeaveSbaModal extends React.Component {

  continueLink() {
    this.props.actions.closeLeaveSba();
    document.location = this.props.url
  }

  render() {
    return (
      <Modal isOpen={ true } className={ styles.content } overlayClassName={ styles.overlay }>
        <img className={ styles.logo } src={ sbaLogo } />
        <a onClick={ this.props.actions.closeLeaveSba }><img className={ styles.exitIcon } src={ exitIcon } /></a>
        <h2 className={ styles.title }> You're leaving the Small Business Administration website.</h2>
        <div className={ styles.divider }></div>
        <p className={ styles.text }>This link is provided for your reference only. The SBA doesn’t endorse non-government websites, companies, or applications. The SBA doesn’t attest to the accuracy
          of information provided by third-parties and other linked sites.</p>
        <div className={ styles.linkContainer }><span>Link to website: </span>
          <a className={ styles.link } tabIndex="0" onClick={ this.continueLink.bind(this)}>
            { this.props.url }
          </a>
        </div>
        <div className={ styles.btnContainer }>
          <button onClick={ this.props.actions.closeLeaveSba } className={ styles.btnCancel }>CANCEL
          </button>
          <button onClick={ this.continueLink.bind(this) } className={ styles.btnContinue }>CONTINUE</button>
        </div>
      </Modal>

      );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    url: reduxState.modalReducer.modalProps.targetUrl
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}
export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(LeaveSbaModal);