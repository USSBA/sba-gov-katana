import React from 'react'
import { SimpleCarousel } from 'atoms'
import { shallow } from 'enzyme'

describe('Simple Carousel', () => {
  it('renders the carousel with correct props', () => {
    const wrapper = shallow(
      <SimpleCarousel>
        <div>I'm a slide</div>
      </SimpleCarousel>
    )
    expect(wrapper.prop('showThumbs')).toBe(false)
    expect(wrapper.prop('infiniteLoop')).toBe(true)
    expect(wrapper.prop('useKeyboardArrows')).toBe(true)
    expect(wrapper.prop('showStatus')).toBe(false)
    expect(wrapper.prop('swipeable')).toBe(true)
    expect(wrapper.prop('showArrows')).toBe(true)
    expect(wrapper.prop('showIndicators')).toBe(true)
  })
  it('renders the children as slides', () => {
    const wrapper = shallow(
      <SimpleCarousel>
        <div>Slide</div>
      </SimpleCarousel>
    )
    expect(wrapper.find('.slide')).toHaveLength(1)
  })
})
