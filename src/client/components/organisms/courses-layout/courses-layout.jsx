import React from 'react'
import PropTypes from 'prop-types'
import styles from './courses-layout.scss'
import { ClientPagingMultiviewLayout, CardCollection } from 'organisms'

class CoursesLayout extends React.PureComponent {
  constructor(ownProps) {
    super()
  }

  makeGridRenderer(items) {
    // assume items is length = 12
    const mappedItems = items.map(item => {
      const { image, summary, title, url } = item
      return {
        image,
        link: {
          title: 'View course',
          uri: url
        },
        titleText: title,
        subtitleText: summary
      }
    })

    /* eslint-disable no-magic-numbers */
    return (
      <div>
        <CardCollection cards={mappedItems.slice(0, 4)} parentIndex={1} numberOverride={4} />
        <CardCollection cards={mappedItems.slice(4, 8)} parentIndex={2} numberOverride={4} />
        <CardCollection cards={mappedItems.slice(8, 12)} parentIndex={3} numberOverride={4} />
      </div>
    )
    /* eslint-enable no-magic-numbers */
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
  onReset: PropTypes.func,
  items: PropTypes.array
}

export default CoursesLayout
