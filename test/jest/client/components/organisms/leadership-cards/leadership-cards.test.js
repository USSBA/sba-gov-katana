import React from 'react'
import { render, cleanup, waitForElement, within } from 'react-testing-library'
import { LeadershipCards } from 'organisms'
import { when } from 'jest-when'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import data from '../../test-data/leadership-cards/leadership-cards.json'
import persons from '../../test-data/leadership-cards/persons.json'

describe('LeadershipCards', () => {
  let fetchRestContentStub

  beforeEach(function() {
    fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')

    const { leadership } = data.paragraphs[1]

    when(fetchRestContentStub)
      .calledWith(leadership[0].person)
      .mockImplementationOnce(() => persons[0])

    when(fetchRestContentStub)
      .calledWith(leadership[1].person)
      .mockImplementationOnce(() => persons[1])

    when(fetchRestContentStub)
      .calledWith(leadership[2].person)
      .mockImplementationOnce(() => persons[2])
  })

  afterEach(function() {
    fetchRestContentStub.mockReset()
    cleanup()
  })

  it('should display 3 LeadershipCards', async () => {
    const { getAllByTestId } = render(<LeadershipCards data={data.paragraphs[1].leadership} />)
    const leaders = await waitForElement(() => getAllByTestId('leader-card'))
    expect(leaders.length).toEqual(3)
  })
  it('should display no LeadershipCards when no data is passed in', async () => {
    const { queryByTestId } = render(<LeadershipCards />)
    const leaders = queryByTestId('leader-card')
    expect(leaders).not.toBeInTheDocument()
  })
})
