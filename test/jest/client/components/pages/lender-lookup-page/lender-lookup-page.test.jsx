import React from 'react'
import { mount } from 'enzyme'

import LenderLookupPage from 'pages/lender-lookup-page/lender-lookup-page.jsx'
// const config = require('config')
import * as clientConfig from 'client/services/client-config'
import { MultiSelect } from 'atoms'
import moment from 'moment'

describe('LenderLookupPage', () => {
  it('should seelct the rapid lenders dropdown', () => {
    const component = mount(<LenderLookupPage />)
    const result = component.find('[data-cy="has-filed-2019-taxes"]')
    expect(result).toHaveLength(1)
  })
})
