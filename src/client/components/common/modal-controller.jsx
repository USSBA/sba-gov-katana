import React from 'react';
import { connect } from 'react-redux';
import LeaveSbaModal from "./leave-sba-modal.jsx";

const modalTypes = {
  "LEAVE_SBA": LeaveSbaModal
};

const ModalController = ({modalType, modalProps}) => {
  console.log(modalType);
  console.log(modalProps);
  if (!modalType) {
    return <div />
  } else {
    const ModalClass = modalTypes[modalType];
    console.log(ModalClass);
    return (<ModalClass {...modalProps} />);
  }
};

export default connect(
  (state) => {
    console.log(state.modalReducer)
    return state.modalReducer;
  }
)(ModalController);
