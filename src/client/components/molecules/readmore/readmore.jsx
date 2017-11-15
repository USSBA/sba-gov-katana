import React from 'react'

import styles from './readmore.scss'
import { SmallSecondaryButton } from 'atoms'

class ReadMore extends React.Component {
  handleClick(e) {
    e.preventDefault()
    this.props.onToggleStatus(!this.props.expanded)
  }
  makeExpanded(text) {
    if (text) {
      let split = text.split('<br/>')
      return split.map(function(item, index) {
        return (
          <p key={index} className={styles.expandedCopyText}>
            {item}{' '}
          </p>
        )
      })
    } else {
      return <div />
    }
  }

  render() {
    let btnText = this.props.expanded ? 'CLOSE' : 'READ MORE'
    let expandedTextSection = this.props.expanded
      ? this.makeExpanded(this.props.readMoreSectionItem.expandedCopyText)
      : ''
    let expandedHr = this.props.expanded ? <hr className={styles.lineCopy} /> : ''
    return (
      <div className={styles.readMoreSection}>
        <h3 id={this.props.parentId + '-title'} className={styles.title}>
          {this.props.readMoreSectionItem.titleText}
        </h3>
        <p key={50} id={this.props.parentId + '-preview'} className={styles.preview}>
          {this.props.readMoreSectionItem.preview}
        </p>
        {expandedHr}
        {expandedTextSection}
        <SmallSecondaryButton
          id={this.props.parentId + '-btn'}
          extraClassName={styles.readMore}
          text={btnText}
          onClick={this.handleClick.bind(this)}
        />
      </div>
    )
  }
}

ReadMore.propTypes = {
  readMoreSectionItem: React.PropTypes.object.isRequired,
  expanded: React.PropTypes.bool.isRequired,
  onToggleStatus: React.PropTypes.func.isRequired,
  parentId: React.PropTypes.string.isRequired
}

export default ReadMore
