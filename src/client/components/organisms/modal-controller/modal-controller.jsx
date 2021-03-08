import React from 'react'
import { connect } from 'react-redux'

import { SbaNewsModal, OfficeContactModal } from 'molecules'
import { MobileSectionNavModal } from 'organisms'

export const ModalController = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <div />
  } else if (modalType === 'MOBILE_SECTION_NAV') {
    return <MobileSectionNavModal {...modalProps} />
  } else if (modalType === 'OFFICE_CONTACT_MODAL') {
    return <OfficeContactModal {...modalProps} />
  }  else if (modalType === 'SBA_NEWSLETTER') {
    return <SbaNewsModal {...modalProps} />
  } else {
    return <div />
  }
}

export default connect(state => {
  return state.modalReducer
})(ModalController)
