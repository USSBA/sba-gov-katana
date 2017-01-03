import React from "react";
import { Modal, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ModalActions from '../../actions/show-modal.js'
import styles from '../../styles/modals/leave-sba-modal.scss'

class LeaveSbaModal extends React.Component {
  render() {
    return <Modal show={ true } onHide={ this.props.actions.closeLeaveSba }>
             <Modal.Header closeButton>
               <Modal.Title className={ styles.title }>You are leaving the Small Business Administration website</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <p className={ styles.text }>SBA does not endorse any non-government websites, companies, or applications and cannot attest to the accuracy of the information provided by third-party sites
                 or any other linked site.</p>
               <p className={ styles.text }>Link to website:
                 <a>
                   { this.props.url }
                 </a>
               </p>
               <Row>
                 <Col className={ styles.btnContainer } xs={ 3 } xsOffset={ 2 } sm={ 2 } smOffset={ 3 }>
                 <button className={ styles.btnCancel + " btn-block" } onClick={ this.props.actions.closeLeaveSba }>Cancel</button>
                 </Col>
                 <Col className={ styles.btnContainer } xs={ 3 } xsOffset={ 1 } sm={ 2 } smOffset={ 2 }>
                 <button className={ styles.btnContinue + " btn-block" } onClick={ this.props.actions.navigateLeaveSba }>Continue</button>
                 </Col>
               </Row>
             </Modal.Body>
           </Modal>;
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