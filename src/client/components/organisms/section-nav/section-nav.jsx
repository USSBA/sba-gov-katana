import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

var Waypoint = require("react-waypoint");
import _ from "lodash";

import * as ModalActions from "../../../actions/show-modal.js";
import styles from "./section-nav.scss";
import whiteIconLaunch from "../../atoms/icons/white-launch.jsx";
import whiteIconPlan from "../../atoms/icons/white-plan.jsx";
import whiteIconManage from "../../atoms/icons/white-manage.jsx";
import whiteIconGrow from "../../atoms/icons/white-grow.jsx";



const businessGuideFullUrl = '/business-guide';

class SectionNav extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayMobileNav) {
      let sectionNavIcon;
      const sectionTitle = this.getNthLineage(-2).title;
      if (sectionTitle === 'Plan your business') {
        sectionNavIcon = whiteIconPlan;
      } else if (sectionTitle === 'Launch your business') {
        sectionNavIcon = whiteIconLaunch;
      } else if (sectionTitle === 'Manage your business') {
        sectionNavIcon = whiteIconManage;
      } else if (sectionTitle === 'Grow your business') {
        sectionNavIcon = whiteIconGrow;
      } else {
        sectionNavIcon = whiteIconGrow;
      }
      this.props.actions.showMobileSectionNav(
        this.getNthLineage(-2),
        sectionNavIcon,
        this.getBacklinkUrl()
      );
    }
  }

  isBusinessGuide() {
    return this.getNthLineage(0).fullUrl === businessGuideFullUrl;
  }

  getNthLineage(n) {
    return _.nth(this.props.lineage, n);
  }

  makeNavLinks() {
    const section = this.getNthLineage(-2);
    const currentPage = this.getNthLineage(-1);
    const navLinks = section.children.map(function(item, index) {
      let currentLinkClass = '';
      if (item.fullUrl === currentPage.fullUrl) {
        currentLinkClass = styles.currentNavLink;
      }
      return (
        <li key={index}>
          <a className={"article-navigation-article-link-desktop " + currentLinkClass}
             id={"desktop-article-link-" + index} href={item.fullUrl}>{item.title}</a>
        </li>
      );
    });
    return navLinks;
  }

  makeNavigationTitle(sectionTitle) {
    const baseSection = this.getNthLineage(0);
    if (this.isBusinessGuide()) {
      const titleArray = _.words(sectionTitle, /[^ ]+/g);
      const firstWord = _.slice(titleArray, 0, 1);
      const remainingTitle = _.replace(sectionTitle, firstWord, '');
      return (
        <span id="article-navigation-title-desktop">
          <h2>{firstWord}</h2>
          <h4>{remainingTitle}</h4>
        </span>
      );
    } else {
      return (
        <span id="article-navigation-title-desktop">
          <h3>{sectionTitle}</h3>
        </span>
      );
    }
  }

  stickyFunctionTop() {
    return this.props.position === 'middle' ? styles.stickyTop : null;
  }

  stickyFunctionBottom() {
    return this.props.position === 'bottom' ? styles.stickyBottom : null;
  }

  getBacklinkUrl() {
    return (this.isBusinessGuide() ? this.getNthLineage(0) : this.getNthLineage(-2)).fullUrl;
  }

  getBacklinkText() {
    const backText = this.isBusinessGuide() ? 'all topics' : this.getNthLineage(-2).title;
    return `Back to ${backText}`;
  }

  render() {
    const navLinks = this.makeNavLinks();
    const sectionTitle = this.getNthLineage(-2).title;
    const navigationTitle = this.makeNavigationTitle(sectionTitle);
    return (
      <div
        id="article-navigation-desktop"
        className={
          styles.sectionNav + ' ' + this.stickyFunctionTop() + ' ' + this.stickyFunctionBottom()
        }>
        <Waypoint topOffset="30px" onEnter={this.props.onTopEnter} />
            <a id="article-navigation-back-button-desktop" className={styles.backLink}
               href={this.getBacklinkUrl()}>{this.getBacklinkText()}</a>
        {navigationTitle}
        <ul>{navLinks}</ul>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch),
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(SectionNav);
export { SectionNav };
