import React from 'react'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { shallow, mount} from 'enzyme'

import { ModalController } from 'organisms/modal-controller/modal-controller.jsx'
import { MobileNav as MobileSectionNavModal } from 'organisms/modals/mobile-section-nav/mobile-section-nav.jsx'
import { LeaveSbaModal } from 'organisms/modals/leave-sba-modal/leave-sba-modal.jsx'


const modalInfo = {
  modalProps: {
    backUrl: false,
    icon: "build/img/img-ed52b1.png",
    menuData: {
      description: 'Partner with the SBA',
      fullUrl: 'partners/lenders',
      node: '2976',
      summary: 'Financial instituition',
      title: 'Lender',
      url: 'lenders',
      weight: -50,
      children: [
        {
          description: null,
          fulUrl: '/partners/lendrs/cdc-504-program',
          node: 2966,
          summary: 'If your organization is designated by the SBA',
          title: "CDC/504 program",
          url: "cdc-504-program",
          weight: -50,
          children: [
            {
              children: null,
              description: null,
              fullUrl: "partners/lenders/7a-loan-program/types-7a-loans",
              node: "2938",
              summary: "7(a) loan program",
              title: "Types of 7(a) loans",
              url: "types-of-7(a)",
              weight: -50
            },
            {
              children: null,
              description: null,
              fullUrl: "partners/lenders/7a-loan-program/community-advantage-loans",
              node: "2944",
              summary: "The SBA Community Advantage",
              title: "Community Loan",
              url: "community-advantage-loans",
              weight: -50
            }
          ]
        },
        {
          description: null,
          fulUrl: '/partners/lendrs/cdc-504-program',
          node: 2966,
          summary: 'If your organization is designated by the SBA',
          title: "CDC/504 program",
          url: "cdc-504-program",
          weight: -50,
          children: [
            {
              children: null,
              description: null,
              fulUrl: '/partners/lendrs/cdc-504-program/secondary-market',
              node: 2964,
              summary: 'There it is',
              title: "Secondary market",
              url: "secondary-market",
              weight: 0
            },
            {
              children: null,
              description: null,
              fulUrl: '/partners/lendrs/cdc-504-program/operate-cdc',
              node: 2956,
              summary: 'Streamlined the lending process',
              title: "Operate as a CDC",
              url: "operate-cdc",
              weight: 0
            }
          ]
        }
      ]
    }
  }
}

describe('ModalController', () => {
  test('should render mobile section navigation modalType', () => {
    const props = _.merge(modalInfo, { modalType: 'MOBILE_SECTION_NAV' })

    props.modalProps.store = {
      getState: () => {
        return false
      },
      subscribe: () => {
        return false
      },
      dispatch: () => {
        return false
      }
    }

  const component = mount(<ModalController {...props} />)
  expect(component.find('MobileNav')).toHaveLength(1)
  })

//   test('should render LeaveSba modalType', () => {
//     const props = {
//       modalType: 'LEAVE_SBA',
//       modalProps: { url: 'https://testing.com' }
//     }

//     props.modalProps.store = {
//       getState: () => {
//         return false
//       },
//       subscribe: () => {
//         return false
//       },
//       dispatch: () => {
//         return false
//       }
//     }

//     const component = mount(<ModalController {...props} />)
//     expect(component.find('LeaveSbaModal')).toHaveLength(1)
//   })
})