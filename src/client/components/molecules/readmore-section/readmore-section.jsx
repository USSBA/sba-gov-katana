import React from 'react'

import styles from './readmore-section.scss'
import { ReadMore } from 'atoms'

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
  readMoreSectionItem: React.PropTypes.object.isRequired,
  parentId: React.PropTypes.string.isRequired
}

export default ReadMoreSection
