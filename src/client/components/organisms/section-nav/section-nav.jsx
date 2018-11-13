import React from 'react'
import Waypoint from 'react-waypoint'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import constants from '../../../services/constants.js'
import hurricaneIcon from 'assets/images/funding-programs/Funding_Programs_Icon_Disaster_white.png'
import styles from './section-nav.scss'
import * as ModalActions from '../../../actions/show-modal.js'
import { determineMenuTileData, getLanguageOverride } from '../../../services/utils.js'
import { Link } from 'atoms'

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
    return (
      this.getNthLineage(0).fullUrl === '/business-guide' ||
      this.getNthLineage(0).fullUrl === '/guia-de-negocios'
    )
  }

  getNthLineage(n) {
    return _.nth(this.props.lineage, n)
  }

  makeNavLinks(langCode) {
    const section = this.getNthLineage(-2)
    const currentPage = this.getNthLineage(-1)
    const navLinks = section.children.map(function(item, index) {
      const titleLinkData = determineMenuTileData(langCode, item)
      let currentLinkClass = ''
      if (
        titleLinkData.fullUrl === currentPage.fullUrl ||
        (langCode === 'es' &&
          currentPage.spanishTranslation &&
          titleLinkData.fullUrl === currentPage.spanishTranslation.fullUrl)
      ) {
        currentLinkClass = styles.currentNavLink
      }
      return (
        <li className={currentLinkClass} key={index}>
          <Link
            className="article-navigation-article-link-desktop"
            id={'desktop-article-link-' + index}
            to={titleLinkData.fullUrl}
          >
            {titleLinkData.title}
          </Link>
        </li>
      )
    })
    return navLinks
  }

  makeNavigationTitle(langCode) {
    const titleSiteMap = this.getNthLineage(-2)
    let sectionTitle
    titleSiteMap.spanishTranslation && langCode === 'es'
      ? (sectionTitle = titleSiteMap.spanishTranslation.title)
      : (sectionTitle = titleSiteMap.title)

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

  getBacklinkUrl(langCode) {
    const businessGuideSiteMap = this.getNthLineage(0)
    const parentSiteMap = this.getNthLineage(-2)
    let backLink
    if (businessGuideSiteMap.spanishTranslation && parentSiteMap.spanishTranslation && langCode === 'es') {
      backLink = (this.isBusinessGuide()
        ? businessGuideSiteMap.spanishTranslation
        : parentSiteMap.spanishTranslation
      ).fullUrl
    } else {
      backLink = (this.isBusinessGuide() ? businessGuideSiteMap : parentSiteMap).fullUrl
    }
    return backLink
  }

  getBacklinkText(langCode) {
    const titleSiteMap = this.getNthLineage(-2)
    let backTo
    let backText

    if (titleSiteMap.spanishTranslation && langCode === 'es') {
      backTo = 'Regresar a'
      backText = this.isBusinessGuide() ? 'todos los temas' : titleSiteMap.spanishTranslation.title
    } else {
      backTo = 'Back to'
      backText = this.isBusinessGuide() ? 'all topics' : titleSiteMap.title
    }
    return `${backTo} ${backText}`
  }

  render() {
    const langCode = getLanguageOverride()
    const navLinks = this.makeNavLinks(langCode)
    const navigationTitle = this.makeNavigationTitle(langCode)
    return (
      <div
        id="article-navigation-desktop"
        className={styles.sectionNav + ' ' + this.stickyFunctionTop() + ' ' + this.stickyFunctionBottom()}
      >
        <Waypoint topOffset="30px" onEnter={this.props.onTopEnter} />
        <Link
          id="article-navigation-back-button-desktop"
          className={styles.backLink}
          to={this.getBacklinkUrl(langCode)}
        >
          {this.getBacklinkText(langCode)}
        </Link>
        {navigationTitle}
        <ul>{navLinks}</ul>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SectionNav)
export { SectionNav }
