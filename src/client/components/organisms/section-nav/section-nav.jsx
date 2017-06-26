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

class SectionNav extends React.Component {

  makeNavLinks(prefix) {
      let navLinks = [];
      let section = _.nth(this.props.lineage, 1);
      navLinks = section.children.map(function(item, index) {
          return (
          <li key={index}>
            <a id={prefix+"-article-link-"+index} href={item.fullUrl}>{item.title}</a>
          </li>
          );
      });
      return navLinks;
  }

  stickyFunctionTop(){
    return this.props.position == "middle" ? styles.stickyTop : null
  }

  stickyFunctionBottom(){
    return this.props.position == "bottom" ? styles.stickyBottom : null
  }


  render() {
    let navLinks = this.makeNavLinks(this.props.displayMobileNav ? "mobile" : "desktop");
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
    let parentUrl = _.nth(this.props.lineage, 0).fullUrl;


    return (
        this.props.displayMobileNav ? (
            this.props.actions.showMobileSectionNav(_.nth(this.props.lineage, 1), sectionNavIcon, "/business-guide")
        ) : (
            <div id="article-navigation-desktop" className={styles.sectionNav + " " + this.stickyFunctionTop() + " " + this.stickyFunctionBottom()}>
                <Waypoint topOffset="30px" onEnter={this.props.onTopEnter}/>
                <a id="article-navigation-back-button-desktop" className={styles.backLink} href="/business-guide">Back to all topics</a>
                <span id="article-navigation-title-desktop"><h2>{firstWord}</h2>
                    <h4>{remainingTitle}</h4>
                </span>
                <ul>{navLinks}</ul>
            </div>
        )

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
