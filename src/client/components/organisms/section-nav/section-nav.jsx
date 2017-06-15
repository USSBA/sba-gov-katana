import React from 'react';
import Sticky from 'react-sticky';
import styles from './section-nav.scss';
import whiteIconLaunch from '../../atoms/icons/white-launch.jsx';
import whiteIconPlan from '../../atoms/icons/white-plan.jsx';
import whiteIconManage from '../../atoms/icons/white-manage.jsx';
import whiteIconGrow from '../../atoms/icons/white-grow.jsx';

class SectionNav extends React.Component {

  makeNavLinks() {
      let navLinks = [];
      let section = _.nth(this.props.lineage, 1);
      navLinks = section.children.map(function(item, index) {
          return (
          <li key={index}>
            <a id={"sectionLinkID"+index} href={item.fullUrl}>{item.title}</a>
          </li>
          );
      });
      return navLinks;
  }

  render() {
    let navLinks = this.makeNavLinks();
    let sectionTitle = _.nth(this.props.lineage, 1).title;
    let titleArray = _.words(sectionTitle);
    let firstWord = _.slice(titleArray, 0, 1);
    let remainingTitle = _.replace(sectionTitle, RegExp("^"+firstWord),'');
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

    return (
        this.props.displayMobileNav ? (
            <div id="mobileSectionNavigationID" className={styles.mobileSectionNav}>
                <a id="mobileAllTopicsLink" className={styles.mobileBackLink} href="/business-guide">
                    <img id="mobileSectionIconID" src={sectionNavIcon} alt=""/>
                    <span id="mobileSectionTitleID"><h2>{firstWord}</h2>
                        <h4>{remainingTitle}</h4>
                    </span>
                </a>
                <ul>{navLinks}</ul>
            </div>
        ) : (
            <div id="sectionNavigationID" className={styles.sectionNav}>
                <a id="allTopicsLink" className={styles.backLink} href="/business-guide">Back to all topics</a>
                <img id="sectionIconID" src={sectionNavIcon} alt=""/>
                <span id="sectionTitleID"><h2>{firstWord}</h2>
                    <h4>{remainingTitle}</h4>
                </span>
                <ul>{navLinks}</ul>
            </div>
        )
    );
  }
}

export default SectionNav;


