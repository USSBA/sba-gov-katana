import React from 'react'
import { connect } from 'react-redux'

import styles from './title-section.scss'
import { DecorativeDash, Link } from 'atoms'

class TitleSection extends React.Component {
  makeTitleLinks(sectionHeaders) {
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
        <p id="titleSectionContentId" className={styles.content}>
          Content
        </p>
        <ul>{titleLinks}</ul>
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
        <DecorativeDash width={5.5} />
        {this.props.sectionHeaders.length > 0 ? titleLinks : ''}
        <hr />
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
