import React from 'react'
import styles from './courses-layout.scss'
import { ClientPagingMultiviewLayout, CardCollection } from 'organisms'

class CoursesLayout extends React.PureComponent {
  constructor(ownProps) {
    super()
  }

  makeGridRenderer(items) {
    // assume items is length = 12
    const mappedItems = items.map(item => {
      return {
        image: item.image,
        link: {
          title: item.title,
          url: item.url
        },
        titleText: item.title,
        subtitleText: item.summary
      }
    })
    return (
      <div>
        <CardCollection cards={mappedItems.slice(0, 4)} parentIndex={1} />
        <CardCollection cards={mappedItems.slice(4, 8)} parentIndex={2} />
        <CardCollection cards={mappedItems.slice(8, 12)} parentIndex={3} />
      </div>
    )
  }

  render() {
    const { onReset, items } = this.props
    return (
      <div className={`courses-layout ${styles.container}`}>
        <ClientPagingMultiviewLayout
          onReset={onReset}
          items={items}
          pageSize={12}
          rendererOne={this.makeGridRenderer}
          type="courses"
        />
      </div>
    )
  }
}

CoursesLayout.defaultProps = {
  onReset: () => {},
  items: []
}

CoursesLayout.propTypes = {
  onReset: React.PropTypes.func,
  items: React.PropTypes.array
}

export default CoursesLayout
