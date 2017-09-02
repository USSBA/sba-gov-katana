import React from "react";
import Waypoint from "react-waypoint";
import styles from "./basic-page.scss";
import {listenForOverlap} from "element-overlap";
import _ from "lodash";
import * as paragraphMapper from "../paragraph-mapper.jsx";
import TitleSection from "../../molecules/title-section/title-section.jsx";
import SectionNav from "../../organisms/section-nav/section-nav.jsx";
import Breadcrumb from "../../molecules/breadcrumb/breadcrumb.jsx";
import PreviousNextSection from "../../molecules/previous-next/previous-next.jsx";
import FeedbackForm from "../../molecules/feedback-form/feedback-form.jsx";
import RemoveMainLoader from "../../molecules/main-loader/remove-main-loader.jsx"


class BasicPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      slideLeftNavIn: false,
      slideContentIn: false,
      displayMobileNav: false,
      currentPosition: "top"
    };
    this.handleSectionNavigationEnter = this.handleSectionNavigationEnter.bind(this);
    this.handleTopWaypointEnter = this.handleTopWaypointEnter.bind(this);
    this.handleTopWaypointLeave = this.handleTopWaypointLeave.bind(this);
    this.handleBackLinkClicked = this.handleBackLinkClicked.bind(this);
    this.handleOverlap = this.handleOverlap.bind(this);
  }

  // componentWillMount() {}

  makeSectionHeaders(paragraphData) {
    const sectionHeaders = paragraphData.map(function(item, index, paragraphArray) {
      if (item && item.type && item.type === "sectionHeader") {
        return {id: paragraphMapper.makeSectionHeaderId(index), text: item.text};
      }
      return undefined;
    });
    return _.compact(sectionHeaders);
  }

  makeParagraphs(paragraphData) {
    const paragraphList = paragraphMapper.makeParagraphs(paragraphData);
    const wrapperClassMapping = {
      other: styles.textSection,
      textSection: styles.textSection,
      textReadMoreSection: "none",
      sectionHeader: styles.sectionHeader,
      subsectionHeader: styles.subsectionHeader,
      image: styles.image,
      lookup: styles.lookup,
      callToAction: styles.callToAction,
      cardCollection: styles.cardCollection,
      styleGrayBackground: styles.textSection
    };
    const wrapped = paragraphMapper.wrapParagraphs(paragraphList, wrapperClassMapping);
    return wrapped;
  }

  makeBreadcrumbs(lineage) {
    return _.map(lineage, (item) => {
      return {url: item.fullUrl, title: item.title};
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

  handleOverlap() {
    this.setState({currentPosition: "bottom"});
  }

  componentDidMount() {
    listenForOverlap("#article-navigation-desktop", "#sba-footer", this.handleOverlap, {listenOn: "scroll"});
  }

  render() {
    const paragraphs = this.makeParagraphs(this.props.paragraphs);
    const sectionHeaders = this.makeSectionHeaders(this.props.paragraphs);
    const breadcrumbs = this.props.lineage
      ? <Breadcrumb items={this.makeBreadcrumbs(this.props.lineage)}/>
      : <div />;

    const sectionNavigation = this.props.lineage
      ? (<SectionNav onTopEnter={ this.handleSectionNavigationEnter } position={this.state.currentPosition} displayMobileNav={this.state.displayMobileNav} lineage={this.props.lineage}/>)
      : (
        <div />
      );
    const previousAndNextButtons = this.props.lineage
      ? <div key={4} className={styles.previousNext}><PreviousNextSection lineage={this.props.lineage}/></div>
      : <div />;

    return (
      <div className={`basicpage ${styles.articleContainer}`}>
        <RemoveMainLoader />
        <Waypoint topOffset="30px" onEnter={this.handleTopWaypointEnter}
                  onLeave={this.handleTopWaypointLeave}/>
        <div className="basicpage-sectionnavigation">{sectionNavigation}</div>
        <div className={`basicpage-mobilenav ${this.state.displayMobileNav
          ? styles.hideContainer
          : styles.container}`}>
          <div className={`basicpage-backlinkmobile ${styles.backLinkMobile}`}>
            <a id="backToallTopicsMobile" href="" onClick={this.handleBackLinkClicked}>Back to all topics</a>
          </div>
          <div key={1} className={`basicpage-breadcrumb ${styles.breadcrumb}`}>{breadcrumbs}</div>
          <div className="basicpage-titlesection"><TitleSection key={2} gridClass={styles.titleSection}
                                                                sectionHeaders={sectionHeaders} title={this.props.title}
                                                                summary={this.props.summary}/> {paragraphs}</div>
          <div key={3} className={`basicpage-feedbackform ${styles.feedback}`}><FeedbackForm/></div>
          <div className="basicpage-previousnext">
            {previousAndNextButtons}
          </div>
        </div>
      </div>
    );
  }
}

BasicPage.defaultProps = {
  paragraphs: []
};

export default BasicPage;
