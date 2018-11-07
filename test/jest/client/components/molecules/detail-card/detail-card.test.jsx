/* global expect */
import React from 'react'
import DetailCard from 'client/components/molecules/detail-card/detail-card.jsx'
import Link from 'client/components/atoms/link/link.jsx'
import { shallow } from 'enzyme'
import _ from 'lodash'

describe('Detail card', () => {
  it('renders a download link for recent file with an extension', () => {
    const detailCardItem = {
      files: [
        {
          effectiveDate: '2018-10-16',
          fileUrl: 'file.txt'
        }
      ]
    }
    const detailCard = shallow(<DetailCard data={detailCardItem} />)
    expect(
      detailCard
        .find(Link)
        .at(1)
        .render()
        .text()
    ).toEqual('Download txt')
  })

  it.skip('renders a download link for recent file without an extension', () => {
    const detailCardItem = {
      files: [
        {
          effectiveDate: '2018-10-16',
          fileUrl: 'file'
        }
      ]
    }
    const detailCard = shallow(<DetailCard data={detailCardItem} />)
    expect(
      detailCard
        .find(Link)
        .at(1)
        .render()
        .text()
    ).toEqual('Download')
  })
})
