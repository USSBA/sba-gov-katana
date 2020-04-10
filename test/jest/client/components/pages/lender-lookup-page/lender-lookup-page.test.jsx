import React from 'react'
import { mount } from 'enzyme'

import LenderLookupPage from 'pages/lender-lookup-page/lender-lookup-page.jsx'
import * as clientConfig from 'client/services/client-config'
import { MultiSelect } from 'atoms'
import moment from 'moment'

describe('LenderLookupPage', () => {
  // TC-3 skipping test until we add back in tax question for find lender ppp page
  it.skip('should selct the rapid lenders dropdown', () => {
    const component = mount(<LenderLookupPage />)
    const result = component.find('[data-cy="has-filed-2019-taxes"]')
    expect(result).toHaveLength(1)
  })
})
