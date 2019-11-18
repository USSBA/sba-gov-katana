import React from 'react'
import { when, resetAllWhenMocks } from 'jest-when'
import 'jest-dom/extend-expect'
import { mount } from 'enzyme'
import PropTypes from 'prop-types'
import DistrictOfficeSubPageTemplate from 'templates/district-office-subpage/district-office-subpage.jsx'
import { TitleSection } from 'molecules'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

const mockData = {
    "paragraphs": [{
            "id": 22889,
            "type": "sectionHeader",
            "text": "About us"
        },
        {
            "id": 22890,
            "type": "textSection",
            "text": "<p>Welcome to the 2019-2020 edition of the U.S. Small Business Administration’s Washington Metropolitan Area Small Business Resource Guide, covering the District of Columbia, northern Virginia and suburban Maryland. With an increasingly diverse and well-educated workforce, the nation's capital and surrounding areas rank among the best locations to develop a successful small business. The SBA helps make the American dream of small business ownership a reality. We are the only federal agency dedicated to helping our nation’s 30 million small businesses start, grow, expand, or recover after a disaster.</p>\r\n\r\n<p>Over the past year, the SBA Washington Metropolitan Area District Office has empowered small businesses to:</p>\r\n\r\n<ul>\r\n\t<li>Find an ally or mentor via our network of SBA-funded Resource Partners, which includes SCORE, Small Business Development Centers, Women’s Business Centers, and the Veterans Business Outreach Center.</li>\r\n\t<li>Access over $335 million in SBA-guaranteed loans through 52 local banks, credit unions, community-based lenders, and microlenders. These qualified borrowers hired over 4,900 new employees, bought needed equipment, and built or renovated facilities.</li>\r\n\t<li>Gain more than $4.6 billion in federal contracting awards. The SBA offers business development and technical support to nearly 1,000 local companies enrolled in the 8(a) Business Development Program.</li>\r\n\t<li>Our region is an innovation hub, home to more than 90,000 small businesses employing over 1 million people. The Washington metro area generates a GDP of $530 billion annually, placing it among the 25 top producing countries. Just as the American spirit of freedom and independence is deeply tied to our local history, so are we deeply committed to ensuring entrepreneurialism continues to strengthen the economy for everyone, now and into the future. Stay informed about SBA events near you and get valuable Washington metro area business information by following us on Twitter at @sba_dcmetro. Register for email updates at sba.gov/updates.</li>\r\n</ul>\r\n"
        }
    ],
    "summary": "Welcome to the 2019-2020 edition of the U.S. Small Business Administration’s Washington Metropolitan Area Small Business Resource Guide.",
    "type": "localResources",
    "title": "Washington Metropolitan Area Resources",
    "id": 20242,
    "updated": 1572629482,
    "created": 1572629417,
    "langCode": "en"
}

const options = {
	context: {
		router: {
			createHref: () => {},
			getCurrentLocation: () => ({ pathname: '' }),
			go: () => {},
			goBack: () => {},
			goForward: () => {},
			isActive: () => {},
			push: () => {},
			replace: () => {},
			setRouteLeaveHook: () => {}
		}
	},
	childContextTypes: { router: PropTypes.object }
}

describe('DistrictOfficeSubPageTemplate', () => {
	it('should render content', async done => {
		const params = {
			subPageId: 20242
		}
		const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
		when(fetchRestContentStub)
		.calledWith(20242)
		fetchRestContentStub.mockImplementationOnce(() => {
			return Promise.resolve(mockData)
		})


    	const component = mount(<DistrictOfficeSubPageTemplate params={params} />, options)
    	setImmediate(() => {
    		// THIS SPITS OUT THE PROPER HTML
    		const result = component.html()
    		// BUT THIS EVALUATES TO 0, AND IT SHOULD EVALUATE TO 1
    		console.log('A--', component.find(TitleSection).length)
    		//expect(component.html()).toEqual(expected)
    		done()
    	})
	})
})
