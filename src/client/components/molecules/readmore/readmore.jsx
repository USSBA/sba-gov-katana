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
      const split = text.split('\n')
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
    const btnText = this.props.expanded ? 'CLOSE' : 'READ MORE'
    const expandedTextSection = this.props.expanded
      ? this.makeExpanded(this.props.readMoreSectionItem.expandedCopyText)
      : ''
    const expandedHtmlSection = this.props.expanded ? (
      <div dangerouslySetInnerHTML={{ __html: this.props.readMoreSectionItem.expandedCopyText }} />
    ) : (
      ''
    )

    const expandedHr = this.props.expanded ? <hr className={styles.lineCopy} /> : ''
    return (
      <div className={styles.readMoreSection}>
        <h3 id={this.props.parentId + '-title'} className={styles.title}>
          {this.props.readMoreSectionItem.titleText}
        </h3>
        {this.props.isHTML ? (
          <div
            dangerouslySetInnerHTML={{ __html: this.props.readMoreSectionItem.preview }}
            key={50}
            id={this.props.parentId + '-preview'}
            className={styles.preview}
          />
        ) : (
          <p key={50} id={this.props.parentId + '-preview'} className={styles.preview}>
            {this.props.readMoreSectionItem.preview}
          </p>
        )}
        {expandedHr}
        {this.props.isHTML ? expandedHtmlSection : expandedTextSection}
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
  parentId: React.PropTypes.string.isRequired,
  isHTML: React.PropTypes.bool
}

export default ReadMore
