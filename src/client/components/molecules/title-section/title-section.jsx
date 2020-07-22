import React from 'react'
import PropTypes from 'prop-types'

import styles from './title-section.scss'
import { DecorativeDash, Link } from 'atoms'
import { getLanguageOverride } from '../../../services/utils.js'
import { TRANSLATIONS } from '../../../translations.js'

class TitleSection extends React.Component {
  makeTitleLinks(sectionHeaders) {
    const { content } = TRANSLATIONS
    const langCode = getLanguageOverride()
    let titleLinks = []
    titleLinks = sectionHeaders.map(function(item, index) {
      return (
        <li id={'titleSectionLinkId' + index} key={index}>
          <Link to={`#${item.id}`}>{item.text}</Link>
        </li>
      )
    })
    return (
      <div>
        <h3 id="titleSectionContentId" className={styles.content}>
          {langCode !== 'es' ? content.en : content.es}
        </h3>
        <ul>{titleLinks}</ul>
        <hr className={styles.hr} />
      </div>
    )
  }

  render() {
    const titleLinks = this.makeTitleLinks(this.props.sectionHeaders)
    return (
      <div id="titleSectionId" className={styles.titleSection + ' ' + this.props.gridClass}>
        <h1 id="titleSectionTitleId" className={styles.title}>
          {this.props.title}
        </h1>
        <h5 id="titleSectionSummaryId" className={styles.summary}>
          {this.props.summary}
        </h5>
        <DecorativeDash width={77} />
        {this.props.sectionHeaders.length > 0 ? titleLinks : ''}
      </div>
    )
  }
}

TitleSection.propTypes = {
  gridClass: PropTypes.string,
  title: PropTypes.string.isRequired,
  sectionHeaders: PropTypes.array,
  summary: PropTypes.string.isRequired
}

export { TitleSection }

export default TitleSection
