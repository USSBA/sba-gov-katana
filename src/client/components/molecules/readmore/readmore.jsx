import React from 'react'
import PropTypes from 'prop-types'

import styles from './readmore.scss'

import { TRANSLATIONS } from '../../../translations'
import { getLanguageOverride } from '../../../services/utils'
import { Button, DecorativeDash } from 'atoms'
import ModalCloseIcon from 'assets/svg/modal-close-icon.svg'
import classNames from 'classnames'
import { isEmpty } from 'lodash'

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
    const imageClassName = classNames({
      [styles.image]: true,
      [styles.expanded]: this.props.readMoreSectionItem.image && this.props.expanded
    })
    return (
      <div className={readMoreClassName}>
        {this.props.expanded && (
          <img
            alt="close icon"
            className={styles.closeIcon}
            src={ModalCloseIcon}
            onClick={this.handleClick.bind(this)}
            data-cy="close button"
            aria-label="Close this section."
          />
        )}
        {!isEmpty(this.props.readMoreSectionItem.image) && (
          <div
            className={imageClassName}
            style={{
              background: `url('${this.props.readMoreSectionItem.image.url}') no-repeat`,
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
            {btnText} <i className="fa fa-angle-right" />
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
