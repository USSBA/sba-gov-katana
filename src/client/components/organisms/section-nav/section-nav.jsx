import React from 'react';
var Waypoint = require('react-waypoint');
import styles from './section-nav.scss';
import whiteIconLaunch from '../../atoms/icons/white-launch.jsx';
import whiteIconPlan from '../../atoms/icons/white-plan.jsx';
import whiteIconManage from '../../atoms/icons/white-manage.jsx';
import whiteIconGrow from '../../atoms/icons/white-grow.jsx';
import * as ModalActions from '../../../actions/show-modal.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from "lodash";

const businessGuideFullUrl = "/business-guide";

export class SectionNav extends React.Component {

  makeNavLinks() {
    const section = _.nth(this.props.lineage, -2);
    const currentPage = _.nth(this.props.lineage, -1);
    const navLinks = section.children.map(function (item, index) {
      let currentLinkClass = "";
      if(item.fullUrl === currentPage.fullUrl){
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
    const baseSection = _.nth(this.props.lineage, 0);
    if(baseSection.fullUrl === businessGuideFullUrl){
      const titleArray = _.words(sectionTitle, /[^ ]+/g);
      const firstWord = _.slice(titleArray, 0, 1);
      const remainingTitle = _.replace(sectionTitle, firstWord, '');
      return (<span id="article-navigation-title-desktop"><h2>{firstWord}</h2>
              <h4>{remainingTitle}</h4>
            </span>);
    } else {
      return (<span id="article-navigation-title-desktop"><h3>{sectionTitle}</h3></span>);
    }
  }

  stickyFunctionTop(){
    return this.props.position == "middle" ? styles.stickyTop : null
  }

  stickyFunctionBottom(){
    return this.props.position == "bottom" ? styles.stickyBottom : null
  }

  getBacklinkUrl(){
    return _.nth(this.props.lineage, -3).fullUrl;
  }

  getBacklinkText(){
    const backText = _.nth(this.props.lineage, -3).title === _.nth(this.props.lineage, 0).title ? "all topics" : _.nth(this.props.lineage, -3).title;
    return `Back to ${backText}`;
  }

  render() {
    const navLinks = this.makeNavLinks();
    const sectionTitle = _.nth(this.props.lineage, -2).title;
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

    return this.props.displayMobileNav
      ? (this.props.actions.showMobileSectionNav(_.nth(this.props.lineage, 1), sectionNavIcon, this.getBacklinkUrl()))
      : (
        <div id="article-navigation-desktop"
             className={styles.sectionNav + " " + this.stickyFunctionTop() + " " + this.stickyFunctionBottom()}>
          <Waypoint topOffset="30px" onEnter={this.props.onTopEnter}/>
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
    actions: bindActionCreators(ModalActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(SectionNav);
