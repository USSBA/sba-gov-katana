import React from 'react'
import Waypoint from 'react-waypoint'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import constants from '../../../services/constants.js'
import hurricaneIcon from 'assets/images/funding-programs/Funding_Programs_Icon_Disaster_white.png'
import styles from './section-nav.scss'
import whiteIconLenders from 'assets/images/for-partners/For_Partners_Icon_Lenders_white.png'
import whiteIconSuretyProviders from 'assets/images/for-partners/For_Partners_Icon_Surety_Providers_white.png'
import * as ModalActions from '../../../actions/show-modal.js'
import { BasicLink, WhiteIconGrow, WhiteIconLaunch, WhiteIconManage, WhiteIconPlan } from 'atoms'

const businessGuideFullUrl = '/business-guide'

class SectionNav extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.displayMobileNav) {
      let sectionNavIcon
      const sectionTitle = this.getNthLineage(-2).title
      const titleConstants = constants.sectionTitles
      if (sectionTitle === titleConstants.planYourBusiness) {
        sectionNavIcon = WhiteIconPlan
      } else if (sectionTitle === titleConstants.launchYourBusiness) {
        sectionNavIcon = WhiteIconLaunch
      } else if (sectionTitle === titleConstants.manageYourBusiness) {
        sectionNavIcon = WhiteIconManage
      } else if (sectionTitle === titleConstants.growYourBusiness) {
        sectionNavIcon = WhiteIconGrow
      } else if (sectionTitle === titleConstants.disasterAssistance) {
        sectionNavIcon = hurricaneIcon
      } else if (sectionTitle === titleConstants.suretyProviders) {
        sectionNavIcon = whiteIconSuretyProviders
      } else if (sectionTitle === titleConstants.lenders) {
        sectionNavIcon = whiteIconLenders
      } else {
        sectionNavIcon = WhiteIconGrow
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
        <li key={index}>
          <BasicLink
            myClassName={'article-navigation-article-link-desktop ' + currentLinkClass}
            id={'desktop-article-link-' + index}
            url={item.fullUrl}
            text={item.title}
            eventConfig={eventConfig}
          />
        </li>
      )
    })
    return navLinks
  }

  makeNavigationTitle(sectionTitle) {
    const baseSection = this.getNthLineage(0)
    if (this.isBusinessGuide()) {
      const titleArray = _.words(sectionTitle, /[^ ]+/g)
      const firstWord = _.slice(titleArray, 0, 1)
      const remainingTitle = _.replace(sectionTitle, firstWord, '')
      return (
        <span id="article-navigation-title-desktop">
          <h2>{firstWord}</h2>
          <h4>{remainingTitle}</h4>
        </span>
      )
    } else {
      return (
        <span id="article-navigation-title-desktop">
          <h3>{sectionTitle}</h3>
        </span>
      )
    }
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
        <BasicLink
          id="article-navigation-back-button-desktop"
          myClassName={styles.backLink}
          url={this.getBacklinkUrl()}
          text={this.getBacklinkText()}
          eventConfig={eventConfig}
        />
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
export default connect(mapReduxStateToProps, mapDispatchToProps)(SectionNav)
export { SectionNav }
