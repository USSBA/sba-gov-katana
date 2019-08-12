import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'

import DistrictOfficeTemplate from 'templates/district-office/district-office.jsx'

const mockOfficeData = {
  title: 'State District Office'
}

afterEach(cleanup)

describe('District Office template', () => {
  it('renders the newsletter sign up component', () => {
    const { getByTestId } = render(<DistrictOfficeTemplate office={mockOfficeData} />)

    const content = getByTestId('office-newsletter')
    expect(content).toBeInTheDocument()
  })
})
