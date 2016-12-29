import React from "react";
import { Modal } from 'react-bootstrap';

class LeaveSbaModal extends React.Component {
  render() {
    return <Modal show={ true } onHide={ this.close }>
             <Modal.Header closeButton>
               <Modal.Title>Modal 1</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <p>Please don't go!!! SBA Loves you.</p>
             </Modal.Body>
           </Modal>;
  }
}
export default LeaveSbaModal;
