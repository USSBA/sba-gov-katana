import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router'

import styles from './title-section.scss'
import { DecorativeDash } from 'atoms'

class TitleSection extends React.Component {
  makeTitleLinks(sectionHeaders) {
    const { location: { pathname } } = this.props
    let titleLinks = []
    titleLinks = sectionHeaders.map(function(item, index) {
      return (
        <li id={'titleSectionLinkId' + index} key={index}>
          <Link
            to={{
              hash: `#${item.id}`,
              pathname
            }}
          >
            {item.text}
          </Link>
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

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location
  }
}

TitleSection.propTypes = {
  title: React.PropTypes.string.isRequired,
  summary: React.PropTypes.string.isRequired
}

export { TitleSection }

export default withRouter(connect(mapStateToProps, null)(TitleSection))
