/* global expect */
import React from 'react'
import DetailCard from 'client/components/molecules/detail-card/detail-card.jsx'
import Link from 'client/components/atoms/link/link.jsx'
import { shallow } from 'enzyme'

// extend this object to add more structure for testing of other features in detail card
const detailCardItem = JSON.stringify({
  files: [
    {
      effectiveDate: '2000-10-16',
      fileUrl: ''
    }
  ]
})

describe('Detail card', () => {
  it('renders a download link for recent file with an extension', () => {
    let customDetailCardItem = JSON.parse(detailCardItem)
    customDetailCardItem.files[0].fileUrl = 'file.txt'
    const detailCard = shallow(<DetailCard data={customDetailCardItem} />)
    expect(
      detailCard
        .find(Link)
        .at(1)
        .render()
        .text()
    ).toEqual('Download txt')
  })

  it('renders a download link for recent file without an extension', () => {
    let customDetailCardItem = JSON.parse(detailCardItem)
    customDetailCardItem.files[0].fileUrl = 'file'
    const detailCard = shallow(<DetailCard data={customDetailCardItem} />)
    expect(
      detailCard
        .find(Link)
        .at(1)
        .render()
        .text()
    ).toEqual('Download')
  })

  it('renders a download link for recent file with multiple periods in the filename', () => {
    let customDetailCardItem = JSON.parse(detailCardItem)
    customDetailCardItem.files[0].fileUrl = 'file.file.xls'
    const detailCard = shallow(<DetailCard data={customDetailCardItem} />)
    expect(
      detailCard
        .find(Link)
        .at(1)
        .render()
        .text()
    ).toEqual('Download xls')
  })

  it('renders a download link for recent file with a filename ending in a period', () => {
    let customDetailCardItem = JSON.parse(detailCardItem)
    customDetailCardItem.files[0].fileUrl = 'file.'
    const detailCard = shallow(<DetailCard data={customDetailCardItem} />)
    expect(
      detailCard
        .find(Link)
        .at(1)
        .render()
        .text()
    ).toEqual('Download')
  })

  it('does not render download link for recent file that contains no file document', () => {
    let customDetailCardItem = JSON.parse(detailCardItem)
    customDetailCardItem.files = []
    const detailCard = shallow(<DetailCard data={customDetailCardItem} />)
    expect(detailCard.find(Link).length).toEqual(1)
  })

  it('renders a download link for the most recent file when there are multiple files', () => {
    let customDetailCardItem = JSON.parse(detailCardItem)
    customDetailCardItem.files.push({
      effectiveDate: '2018-10-16',
      fileUrl: 'file.mostrecent'
    })
    const detailCard = shallow(<DetailCard data={customDetailCardItem} />)
    expect(
      detailCard
        .find(Link)
        .at(1)
        .render()
        .text()
    ).toEqual('Download mostrecent')
  })

  it('will not redirect the url when the download link is clicked', () => {
    let customDetailCardItem = JSON.parse(detailCardItem)
    customDetailCardItem.files.push({
      effectiveDate: '2018-10-16',
      fileUrl: 'filename.ext'
    })

    const cardComponent = shallow(<DetailCard data={customDetailCardItem} />)

    // finding the second link in cardComponent, i.e. the download document link
    const linkComponent = cardComponent.find(Link).at(1)

    expect(linkComponent.props()).not.toHaveProperty('to')
  })
})
