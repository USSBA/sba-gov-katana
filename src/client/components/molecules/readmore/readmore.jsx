import React from 'react'
import PropTypes from 'prop-types'

import styles from './readmore.scss'

import { TRANSLATIONS } from '../../../translations'
import { getLanguageOverride } from '../../../services/utils'
import { Button, DecorativeDash } from 'atoms'
import classNames from 'classnames'

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
    const readMoreClassName = classNames({
      [styles.readMoreSection]: true,
      [styles.expanded]: this.props.readMoreSectionItem.image && this.props.expanded
    })
    const src = 'https://avery.ussba.io/sites/default/files/2020-09/7Z8A0557.jpg'
    const imageClassName = classNames({
      [styles.image]: true,
      [styles.expanded]: this.props.readMoreSectionItem.image && this.props.expanded
    })
    return (
      <div className={readMoreClassName}>
        {this.props.expanded && (
          <a href="#" role="button" onClick={this.handleClick.bind(this)}>
            <i className="fa fa-close" />
          </a>
        )}
        {this.props.readMoreSectionItem.image && (
          <div
            className={imageClassName}
            style={{
              background: `url('${src}') no-repeat`,
              backgroundSize: 'cover',
              backgroundPosition: 'top'
            }}
          />
        )}
        <div>
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
          <DecorativeDash width={1.75} />
          {this.props.isHTML ? expandedHtmlSection : expandedTextSection}
          <a href="#" onClick={this.handleClick.bind(this)}>
            {btnText} <i className="fa fa-chevron-right" />
          </a>
        </div>
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
