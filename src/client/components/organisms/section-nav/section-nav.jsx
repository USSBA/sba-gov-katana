import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from "lodash";
import {
  BasicLink,
  whiteIconLaunch,
  whiteIconPlan,
  whiteIconManage,
  whiteIconGrow
} from "atoms";
import * as ModalActions from "../../../actions/show-modal.js";
import styles from "./section-nav.scss";
var Waypoint = require("react-waypoint");

const businessGuideFullUrl = "/business-guide";

class SectionNav extends React.Component {

  isBusinessGuide(){
    return this.getNthLineage(0).fullUrl === businessGuideFullUrl;
  }

  getNthLineage(n) {
    return _.nth(this.props.lineage, n);
  }

  makeNavLinks() {
    const section = this.getNthLineage(-2);
    const currentPage = this.getNthLineage(-1);
    const navLinks = section.children.map(function (item, index) {
      let currentLinkClass = "";
      if(item.fullUrl === currentPage.fullUrl){
        currentLinkClass = styles.currentNavLink;
      }
      return (
        <li key={index}>
          <BasicLink myClassName={"article-navigation-article-link-desktop " + currentLinkClass}
             id={"desktop-article-link-" + index} url={item.fullUrl} text={item.title} />
        </li>
      );
    });
    return navLinks;
  }

  makeNavigationTitle(sectionTitle) {
    const baseSection = this.getNthLineage(0);
    if(this.isBusinessGuide()){
      const titleArray = _.words(sectionTitle, /[^ ]+/g);
      const firstWord = _.slice(titleArray, 0, 1);
      const remainingTitle = _.replace(sectionTitle, firstWord, "");
      return (<span id="article-navigation-title-desktop"><h2>{firstWord}</h2>
              <h4>{remainingTitle}</h4>
            </span>);
    } else {
      return (<span id="article-navigation-title-desktop"><h3>{sectionTitle}</h3></span>);
    }
  }


  stickyFunctionTop(){
    return this.props.position === "middle" ? styles.stickyTop : null;
  }

  stickyFunctionBottom(){
    return this.props.position === "bottom" ? styles.stickyBottom : null;
  }

  getBacklinkUrl(){
    return (this.isBusinessGuide() ? this.getNthLineage(0) : this.getNthLineage(-2)).fullUrl;
  }


  getBacklinkText(){
    const backText = this.isBusinessGuide() ? "all topics" : this.getNthLineage(-2).title;
    return `Back to ${backText}`;
  }

  render() {
    const navLinks = this.makeNavLinks();
    const sectionTitle = this.getNthLineage(-2).title;
    const navigationTitle = this.makeNavigationTitle(sectionTitle);

    let sectionNavIcon;

    if (sectionTitle === "Plan your business") {
      sectionNavIcon = whiteIconPlan;
    } else if (sectionTitle === "Launch your business") {
      sectionNavIcon = whiteIconLaunch;
    } else if (sectionTitle === "Manage your business") {
      sectionNavIcon = whiteIconManage;
    } else if (sectionTitle === "Grow your business") {
      sectionNavIcon = whiteIconGrow;
    } else {
      sectionNavIcon = whiteIconGrow;
    }

    if(this.props.displayMobileNav) {
      this.props.actions.showMobileSectionNav(this.getNthLineage(1), sectionNavIcon, this.getBacklinkUrl());
      return (<div></div>);
    } else {
      return (
        <div id="article-navigation-desktop"
             className={styles.sectionNav + " " + this.stickyFunctionTop() + " " + this.stickyFunctionBottom()}>
          <Waypoint topOffset="30px" onEnter={this.props.onTopEnter}/>
          <BasicLink id="article-navigation-back-button-desktop" myClassName={styles.backLink}
             url={this.getBacklinkUrl()} text={this.getBacklinkText()} />
          {navigationTitle}
          <ul>{navLinks}</ul>
        </div>
      );
    }
  }
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(SectionNav);
export {SectionNav};
