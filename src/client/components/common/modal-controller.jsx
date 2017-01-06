import React from 'react';
import { connect } from 'react-redux';
import LeaveSbaModal from "./leave-sba-modal.jsx";

const modalTypes = {
  "LEAVE_SBA": LeaveSbaModal
};

const ModalController = ({modalType, modalProps}) => {
  if (!modalType) {
    return <div />
  } else {
    const ModalClass = modalTypes[modalType];
    return (<ModalClass {...modalProps} />);
  }
};

export default connect(
  (state) => {
    return state.modalReducer;
  }
)(ModalController);
