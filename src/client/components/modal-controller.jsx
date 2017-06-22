import React from 'react';
import { connect } from 'react-redux';
import LeaveSbaModal from "./organisms/modals/leave-sba-modal/leave-sba-modal.jsx";
import SbaNewsModal from "./molecules/news-modal.jsx";
import MobileNav from "./organisms/modals/mobile-nav/mobile-nav.jsx";

const modalTypes = {
  "LEAVE_SBA": LeaveSbaModal,
  "SBA_NEWSLETTER": SbaNewsModal,
  "MOBILE_NAV": MobileNav
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
