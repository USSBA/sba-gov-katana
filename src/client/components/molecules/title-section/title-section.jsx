import React from 'react'
import { connect } from 'react-redux'

import styles from './title-section.scss'
import { DecorativeDash, Link } from 'atoms'
import { getLanguageOverride } from '../../../services/utils.js'
<<<<<<< HEAD
import { MISC_TRANSLATIONS } from '../../../translations.js'

class TitleSection extends React.Component {
  makeTitleLinks(sectionHeaders) {
    const { content } = MISC_TRANSLATIONS
=======

class TitleSection extends React.Component {
  makeTitleLinks(sectionHeaders) {
>>>>>>> 5a4e4f5c... T1-990 Display Content in Spanish if langCode is es
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
<<<<<<< HEAD
          {langCode !== 'es' ? content.en : content.es}
=======
          {langCode !== 'es' ? 'Content' : 'Contenidos'}
>>>>>>> 5a4e4f5c... T1-990 Display Content in Spanish if langCode is es
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
        <DecorativeDash width={4.28} />
        {this.props.sectionHeaders.length > 0 ? titleLinks : ''}
      </div>
    )
  }
}

TitleSection.propTypes = {
  title: React.PropTypes.string.isRequired,
  summary: React.PropTypes.string.isRequired
}

export { TitleSection }

export default TitleSection
