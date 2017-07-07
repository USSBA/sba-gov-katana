import React from 'react';
import { connect } from 'react-redux';
import LeaveSbaModal from "./organisms/modals/leave-sba-modal/leave-sba-modal.jsx";
import SbaNewsModal from "./molecules/news-modal.jsx";
import MobileSectionNav from "./organisms/modals/mobile-section-nav/mobile-section-nav.jsx";

const modalTypes = {
  "LEAVE_SBA": LeaveSbaModal,
  "SBA_NEWSLETTER": SbaNewsModal,
  "MOBILE_SECTION_NAV": MobileSectionNav
};

const ModalController = ({modalType, modalProps}) => {
  if (!modalType) {
    return <div />
  } else {
    const ModalClass = modalTypes[modalType];
    if(ModalClass){
        return (<ModalClass {...modalProps} />);
    }else{
        return <div />
    }
  }
};

export default connect(
  (state) => {
    return state.modalReducer;
  }
)(ModalController);
