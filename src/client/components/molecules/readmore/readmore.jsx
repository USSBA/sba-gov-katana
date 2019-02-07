import React from 'react'
import PropTypes from 'prop-types'

import styles from './readmore.scss'

import { TRANSLATIONS } from '../../../translations'
import { getLanguageOverride } from '../../../services/utils'
import { Button, DecorativeDash } from 'atoms'

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
    const langCode = getLanguageOverride()
    const btnText = this.props.expanded ? TRANSLATIONS.close[langCode] : TRANSLATIONS.readMore[langCode]
    const expandedTextSection = this.props.expanded
      ? this.makeExpanded(this.props.readMoreSectionItem.expandedCopyText)
      : ''
    const expandedHtmlSection = this.props.expanded ? (
      <div dangerouslySetInnerHTML={{ __html: this.props.readMoreSectionItem.expandedCopyText }} />
    ) : (
      ''
    )
    const expandedHr = this.props.expanded ? <DecorativeDash width={1.75} /> : ''

    return (
      <div className={styles.readMoreSection}>
        <h3 id={this.props.parentId + '-title'}>{this.props.readMoreSectionItem.titleText}</h3>
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
        <Button alternate id={this.props.parentId + '-btn'} onClick={this.handleClick.bind(this)} primary>
          {btnText}
        </Button>
      </div>
    )
  }
}

ReadMore.propTypes = {
  readMoreSectionItem: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  isHTML: PropTypes.bool
}

export default ReadMore
