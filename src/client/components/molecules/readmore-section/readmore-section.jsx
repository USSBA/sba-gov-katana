import React from 'react'
import PropTypes from 'prop-types'

import styles from './readmore-section.scss'
import { ReadMore } from 'molecules'

class ReadMoreSection extends React.Component {
  constructor(props) {
    super()
    this.state = {
      expanded: false
    }
  }

  handleToggleStatus(readMoreStatus) {
    this.setState({ expanded: readMoreStatus })
  }

  render() {
    let expandedStyle = this.state.readMoreExpanded ? styles.expanded : ''

    return (
      <ReadMore
        parentId={this.props.parentId + '-read-more'}
        onToggleStatus={this.handleToggleStatus.bind(this)}
        expanded={this.state.expanded}
        readMoreSectionItem={this.props.readMoreSectionItem}
      />
    )
  }
}

ReadMoreSection.propTypes = {
  readMoreSectionItem: PropTypes.object.isRequired,
  parentId: PropTypes.string.isRequired
}

export default ReadMoreSection
