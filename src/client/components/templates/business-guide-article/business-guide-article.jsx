import React from 'react'
import Waypoint from "react-waypoint"
import styles from './business-guide-article.scss';
import {listenForOverlap} from 'element-overlap';
import _ from "lodash";
import * as paragraphMapper from "../paragraph-mapper.jsx";

import TitleSection from "../../molecules/title-section/title-section.jsx";
import SectionNav from "../../organisms/section-nav/section-nav.jsx";
import Breadcrumb from "../../molecules/breadcrumb/breadcrumb.jsx";
import PreviousNextSection from "../../molecules/previous-next/previous-next.jsx";
import FeedbackForm from "../../molecules/feedback-form/feedback-form.jsx";


class BusinessGuideArticle extends React.Component {

  constructor(props) {
    super();
    this.state = {
      slideLeftNavIn: false,
      slideContentIn: false,
      displayMobileNav: false,
      currentPosition: "top"
    };
  }

  componentWillMount() {}

  makeSectionHeaders(paragraphData) {
    let sectionHeaders = paragraphData.map(function(item, index, paragraphArray) {
      if (item && item.type && item.type === "sectionHeader") {
        return {id: paragraphMapper.makeSectionHeaderId(index), text: item.text};
      }
      return undefined;
    });
    return _.compact(sectionHeaders);
  }

  makeParagraphs(paragraphData) {
    let paragraphList = paragraphMapper.makeParagraphs(paragraphData);
    let wrapperClassMapping = {
      other: styles.textSection,
      textSection: styles.textSection,
      textReadMoreSection: "none",
      sectionHeader: styles.sectionHeader,
      subsectionHeader: styles.textSection,
      image: styles.image,
      lookup: styles.lookup,
      callToAction: styles.callToAction,
      cardCollection: styles.cardCollection,
      styleGrayBackground: styles.textSection
    };
    let wrapped = paragraphMapper.wrapParagraphs(paragraphList, wrapperClassMapping)
    return wrapped;
  }

  makeBreadcrumbs(lineage) {
    return _.map(lineage, (item) => {
      return {url: item.fullUrl, title: item.title}
    });
  }

  handleBackLinkClicked(e) {
    e.preventDefault();
    this.setState({slideLeftNavIn: false, slideContentIn: false, displayMobileNav: true});
  }

  handleTopWaypointEnter() {
    this.setState({currentPosition: "top"});
  }

  handleTopWaypointLeave() {
    this.setState({currentPosition: "middle"});
  }

  handleBottomWaypointLeave() {
    this.setState({currentPosition: "middle"});
  }

  handleSectionNavigationEnter() {
    if (this.state.currentPosition === "bottom") {
      this.setState({currentPosition: "middle"});
    }
  }

  componentDidMount() {
    let me = this;
    listenForOverlap('#article-navigation-desktop', '#sba-footer', function() {
      me.setState({currentPosition: "bottom"});
    }, {listenOn: "scroll"});
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    let sectionHeaders = this.makeSectionHeaders(this.props.paragraphs);
    let breadcrumbs = this.props.lineage
      ? this.makeBreadcrumbs(this.props.lineage)
      : <div></div>;

    let sectionNavigation = this.props.lineage
      ? (<SectionNav onTopEnter={this.handleSectionNavigationEnter.bind(this)} position={this.state.currentPosition} displayMobileNav={this.state.displayMobileNav} lineage={this.props.lineage}/>)
      : (
        <div></div>
      );
    let previousAndNextButtons = this.props.lineage
      ? <div key={4} className={styles.previousNext}><PreviousNextSection lineage={this.props.lineage}/></div>
      : <div></div>;

    return (
      <div className={styles.articleContainer}>
        <Waypoint topOffset="30px" onEnter={this.handleTopWaypointEnter.bind(this)} onLeave={this.handleTopWaypointLeave.bind(this)}/> {sectionNavigation}
        <div className={this.state.displayMobileNav
          ? styles.hideContainer
          : styles.container}>
          <div className={styles.backLinkMobile}>
            <a id="backToallTopicsMobile" href="" onClick={this.handleBackLinkClicked.bind(this)}>Back to all topics</a>
          </div>
          <div key={1} className={styles.breadcrumb}><Breadcrumb items={breadcrumbs}/></div>
          <TitleSection key={2} gridClass={styles.titleSection} sectionHeaders={sectionHeaders} title={this.props.title} summary={this.props.summary}/> {paragraphs}
          <div key={3} className={styles.feedback}><FeedbackForm/></div>
          {previousAndNextButtons}
        </div>
      </div>
    );
  }
}

export default BusinessGuideArticle;
