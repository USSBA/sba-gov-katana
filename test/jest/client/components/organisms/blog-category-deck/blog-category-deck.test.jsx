import React from 'react'
import { BlogCategoryDeck, CardCollection } from 'organisms'
import { Button } from 'atoms'
import { shallow, mount } from 'enzyme'

const mockCardsData = [
  {
    blogCategory: 'SBA News and Views',
    created: 1554897112,
    id: 10,
    title: 'SBA celebrates National Veterans Small Business Week',
    summary: 'We approach Veterans Day and National Veterans Small Business Week.',
    type: 'blog',
    url: '/blog/sba-celebrates-national-veterans-small-business-week'
  },
  {
    blogCategory: 'SBA News and Views',
    created: 1554897112,
    id: 11,
    title: 'SBA celebrates Memorial Day',
    summary: 'We approach Memorial Day and National Small Business Week.',
    type: 'blog',
    url: '/blog/sba-celebrates-memorial-day'
  },
  {
    blogCategory: 'Industry Word',
    created: 1554897112,
    id: 12,
    title: 'SBA celebrates Halloween',
    summary: 'We approach Halloween and National Small Business Week.',
    type: 'blog',
    url: '/blog/sba-celebrates-halloween'
  }
]

describe('Blogs landing page', () => {
  it('displays category title', () => {
    const component = shallow(<BlogCategoryDeck categoryTitle={'SBA News & Views posts'} />)

    expect(
      component
        .find('[data-testid="category-title"]')
        .render()
        .text()
    ).toEqual('SBA News & Views posts')
  })

  it('displays category subtitle', () => {
    const component = shallow(
      <BlogCategoryDeck categorySubtitle={"Insights and updates from SBA's small business experts."} />
    )

    expect(
      component
        .find('[data-testid="category-subtitle"]')
        .render()
        .text()
    ).toEqual("Insights and updates from SBA's small business experts.")
  })

  it('displays a card collection', () => {
    const component = mount(<BlogCategoryDeck cards={mockCardsData} />)
    const cardCollectionComponent = component.find(CardCollection)

    expect(cardCollectionComponent.length).toEqual(1)
  })

  it('displays a see more posts button', () => {
    const component = mount(
      <BlogCategoryDeck
        // cards={mockCardsData}
        categoryUrl="/blogs/news-and-views"
      />
    )
    const buttonComponent = component.find(Button)

    expect(buttonComponent.length).toEqual(1)
    expect(buttonComponent.render().text()).toEqual('SEE MORE POSTS')
  })
})
