import React from 'react'
import Waypoint from 'react-waypoint'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import constants from '../../../services/constants.js'
import hurricaneIcon from 'assets/images/funding-programs/Funding_Programs_Icon_Disaster_white.png'
import styles from './section-nav.scss'
import { TRANSLATIONS } from '../../../translations.js'
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
      this.props.actions.showMobileSectionNav(
        this.getNthLineage(-2),
        sectionNavIcon,
        this.getBacklinkUrl(this.getNthLineage(0), this.getNthLineage(-2), langCode)
      )
    }
  }

  isBusinessGuide(parentSiteMap, langCode) {
    let result
    if (langCode === 'es') {
      result = parentSiteMap.fullUrl === '/guia-de-negocios'
    } else {
      result = parentSiteMap.fullUrl === '/business-guide'
    }
    return result
  }

  getNthLineage(n) {
    return _.nth(this.props.lineage, n)
  }

  makeNavLinks(sectionSiteMap, currentPageSiteMap, langCode) {
    const navLinks = sectionSiteMap.children.map(function(item, index) {
      const titleLinkData = determineMenuTileData(langCode, item)
      let currentLinkClass = ''
      if (
        titleLinkData.fullUrl === currentPageSiteMap.fullUrl ||
        (langCode === 'es' &&
          currentPageSiteMap.spanishTranslation &&
          titleLinkData.fullUrl === currentPageSiteMap.spanishTranslation.fullUrl)
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

  makeNavigationTitle(titleSiteMap, langCode) {
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

  getBacklinkUrl(businessGuideSiteMap, parentSiteMap, langCode) {
    let backLink
    if (businessGuideSiteMap.spanishTranslation && parentSiteMap.spanishTranslation && langCode === 'es') {
      backLink = (this.isBusinessGuide(businessGuideSiteMap, langCode)
        ? businessGuideSiteMap.spanishTranslation
        : parentSiteMap.spanishTranslation
      ).fullUrl
    } else {
      backLink = (this.isBusinessGuide(businessGuideSiteMap, langCode)
        ? businessGuideSiteMap
        : parentSiteMap
      ).fullUrl
    }
    return backLink
  }

  getBacklinkText(langCode) {
    const { allTopics, backTo } = TRANSLATIONS
    const backToText = backTo[langCode].text
    const { spanishTranslation, title } = this.getNthLineage(-2)

    const backTitleText = this.isBusinessGuide(this.getNthLineage(0), langCode)
      ? allTopics[langCode].text
      : spanishTranslation && langCode === 'es' ? spanishTranslation.title : title

    return `${backToText} ${backTitleText}`
  }

  render() {
    const langCode = getLanguageOverride()
    const navLinks = this.makeNavLinks(this.getNthLineage(-2), this.getNthLineage(-1), langCode)
    const navigationTitle = this.makeNavigationTitle(this.getNthLineage(-2), langCode)
    return (
      <div
        id="article-navigation-desktop"
        className={styles.sectionNav + ' ' + this.stickyFunctionTop() + ' ' + this.stickyFunctionBottom()}
      >
        <Waypoint topOffset="30px" onEnter={this.props.onTopEnter} />
        <Link
          id="article-navigation-back-button-desktop"
          className={styles.backLink}
          to={this.getBacklinkUrl(this.getNthLineage(0), this.getNthLineage(-2), langCode)}
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
