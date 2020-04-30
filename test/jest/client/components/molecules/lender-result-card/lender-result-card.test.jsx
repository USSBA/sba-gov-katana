import React from 'react'
import { shallow, mount } from 'enzyme'
import LenderResultCard from 'client/components/molecules/lender-result-card/lender-result-card.jsx'

describe('LenderResultCard', () => {
  const mockProps = {
    link: 'sba.gov',
    phoneNumber: '301-792-0678',
    streetAddress: '3913 7th St NE',
    city: 'Washington',
    state: 'DC',
    zipCode: '20015',
    title: 'Credit Union'
  }
  it('renders the passed title', () => {
    const wrapper = shallow(<LenderResultCard {...mockProps} />)
    expect(wrapper.find('h4').text()).toEqual('Credit Union')
  })

  it('renders the address', () => {
    const wrapper = mount(<LenderResultCard {...mockProps} />)
    const addressInnerHtml = wrapper
      .find('[data-testid="contact address"] span')
      .prop('dangerouslySetInnerHTML')
    expect(addressInnerHtml).toEqual(
      expect.objectContaining({
        __html: '3913 7th St NE<br />Washington, DC 20015'
      })
    )
  })

  it('renders the phoneNumber', () => {
    const wrapper = shallow(<LenderResultCard {...mockProps} />)
    expect(wrapper.find('[data-testid="contact phone"] span').text()).toEqual('301-792-0678')
  })

  it('renders a globe icon', () => {
    const wrapper = shallow(<LenderResultCard {...mockProps} />)
    expect(wrapper.find('.fa-globe')).toHaveLength(1)
  })

  it('renders a phone icon', () => {
    const wrapper = shallow(<LenderResultCard {...mockProps} />)
    expect(wrapper.find('.fa-phone')).toHaveLength(1)
  })

  it('applied disabled class when phone number or link are not available', () => {
    const wrapper = shallow(<LenderResultCard title={'Hello'} />)
    expect(wrapper.find('.disabled')).toHaveLength(2)
  })
})
