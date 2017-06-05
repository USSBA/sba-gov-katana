import React from 'react';
import styles from './section-nav.scss';
import whiteIconLaunch from '../../atoms/icons/white-launch.jsx';
import whiteIconPlan from '../../atoms/icons/white-plan.jsx';
import whiteIconManage from '../../atoms/icons/white-manage.jsx';
import whiteIconGrow from '../../atoms/icons/white-grow.jsx';

class SectionNav extends React.Component {

  makeNavLinks() {
      let NavLinks = [];
      let section = _.nth(this.props.lineage, 1);
      // console.log("section: " + JSON.stringify(section));
      NavLinks = section.children.map(function(item, index) {
          return (
          <li key={index}>
            <a href={item.fullUrl}>{item.title}</a>
          </li>
          );
      });
      return NavLinks;
  }

  render() {
    let NavLinks = this.makeNavLinks();
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
      sectionNavIcon = whiteIconManage;
    }


    return (
    <div className={styles.SectionNav}>
      <a className={styles.BackLink} href="/business-guide">Back to all topics</a>
      <img src={sectionNavIcon} alt=""/>
      <h2>{firstWord}</h2>
      <h4>{remainingTitle}</h4>
      <ul>
        <ul>{NavLinks}</ul>
      </ul>
    </div>
    );
  }
}

export default SectionNav;



