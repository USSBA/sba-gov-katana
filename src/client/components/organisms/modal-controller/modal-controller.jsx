import React from 'react'
import { connect } from 'react-redux'

import { SbaNewsModal } from 'molecules'
import { LeaveSbaModal, MobileSectionNavModal } from 'organisms'

const ModalController = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <div />
  } else if (modalType === 'MOBILE_SECTION_NAV') {
      return <MobileSectionNavModal {...modalProps} />
    } else if (modalType === 'LEAVE_SBA'){
      return <LeaveSbaModal {...modalProps} />
    } else if (modalType === 'SBA_NEWSLETTER') {
      return <SbaNewsModal {...modalProps} />
    } else {
      return <div />
    }
}

export default connect(state => {
  return state.modalReducer
})(ModalController)

export { ModalController }