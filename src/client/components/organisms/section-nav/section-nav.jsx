import React from 'react'
import Waypoint from 'react-waypoint'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import constants from '../../../services/constants.js'
import hurricaneIcon from 'assets/images/funding-programs/Funding_Programs_Icon_Disaster_white.png'
import styles from './section-nav.scss'
import * as ModalActions from '../../../actions/show-modal.js'
import { Link } from 'atoms'

const businessGuideFullUrl = '/business-guide'

class SectionNav extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.displayMobileNav) {
      let sectionNavIcon
      const sectionTitle = this.getNthLineage(-2).title
      const titleConstants = constants.sectionTitles
      if (sectionTitle === titleConstants.disasterAssistance) {
        sectionNavIcon = hurricaneIcon
      }
      this.props.actions.showMobileSectionNav(this.getNthLineage(-2), sectionNavIcon, this.getBacklinkUrl())
    }
  }

  isBusinessGuide() {
    return this.getNthLineage(0).fullUrl === businessGuideFullUrl
  }

  getNthLineage(n) {
    return _.nth(this.props.lineage, n)
  }

  makeNavLinks() {
    const section = this.getNthLineage(-2)
    const currentPage = this.getNthLineage(-1)
    const navLinks = section.children.map(function(item, index) {
      let currentLinkClass = ''
      if (item.fullUrl === currentPage.fullUrl) {
        currentLinkClass = styles.currentNavLink
      }
      const eventConfig = {
        category: 'Menu-Rail',
        action: section.title + ' ' + item.title
      }
      return (
        <li className={currentLinkClass} key={index}>
          <Link
            className="article-navigation-article-link-desktop"
            id={'desktop-article-link-' + index}
            to={item.fullUrl}
          >
            {item.title}
          </Link>
        </li>
      )
    })
    return navLinks
  }

  makeNavigationTitle(sectionTitle) {
    return (
      <span id="article-navigation-title-desktop">
        <h3>{sectionTitle}</h3>
      </span>
    )
  }

  stickyFunctionTop() {
    return this.props.position === 'middle' ? styles.stickyTop : null
  }

  stickyFunctionBottom() {
    return this.props.position === 'bottom' ? styles.stickyBottom : null
  }

  getBacklinkUrl() {
    return (this.isBusinessGuide() ? this.getNthLineage(0) : this.getNthLineage(-2)).fullUrl
  }

  getBacklinkText() {
    const backText = this.isBusinessGuide() ? 'all topics' : this.getNthLineage(-2).title
    return `Back to ${backText}`
  }

  render() {
    const navLinks = this.makeNavLinks()
    const sectionTitle = this.getNthLineage(-2).title
    const navigationTitle = this.makeNavigationTitle(sectionTitle)
    const eventConfig = {
      category: 'Menu-Rail',
      action: sectionTitle
    }
    return (
      <div
        id="article-navigation-desktop"
        className={styles.sectionNav + ' ' + this.stickyFunctionTop() + ' ' + this.stickyFunctionBottom()}
      >
        <Waypoint topOffset="30px" onEnter={this.props.onTopEnter} />
        <Link
          id="article-navigation-back-button-desktop"
          className={styles.backLink}
          to={this.getBacklinkUrl()}
        >
          {this.getBacklinkText()}
        </Link>
        {navigationTitle}
        <ul>{navLinks}</ul>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}

export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(SectionNav)
export { SectionNav }
