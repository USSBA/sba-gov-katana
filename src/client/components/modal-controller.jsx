import React from 'react'
import { connect } from 'react-redux'
import { SbaNewsModal } from 'molecules'
import { LeaveSbaModal, MobileSectionNavModal } from 'organisms'

const modalTypes = {
  LEAVE_SBA: LeaveSbaModal,
  SBA_NEWSLETTER: SbaNewsModal,
  MOBILE_SECTION_NAV: MobileSectionNavModal
}

const ModalController = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <div />
  } else {
    const ModalClass = modalTypes[modalType]
    if (ModalClass) {
      return <ModalClass {...modalProps} />
    } else {
      return <div />
    }
  }
}

export default connect(state => {
  return state.modalReducer
})(ModalController)
