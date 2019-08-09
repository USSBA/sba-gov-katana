import React from 'react'
import { render, cleanup } from 'react-testing-library'
import DistrictOffice from 'templates/district-office/district-office.jsx'

import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('District Office template', () => {
  it('renders a CTA for any district office', async () => {
    const mockOfficeData = { title: 'Fearless HQ' }

    const { getByTestId } = render(<DistrictOffice office={mockOfficeData} />)

    const cta = getByTestId('call-to-action')
    expect(cta).toBeInTheDocument()
  })
})
