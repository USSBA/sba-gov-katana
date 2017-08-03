import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../actions/content.js";
import * as NavigationActions from '../../actions/navigation.js';
import _ from 'lodash';
import {findPageLineage, findSubSection, findSection} from "../../services/menu.js";
import Page from "./page.jsx";
import SectionPage from "./section-page/section-page.jsx";
import path from "path";
import ErrorPage from "../pages/error-page/error-page.jsx";
import DocumentPage from "../pages/document-page/document-page.jsx"
import ArticlePage from "../pages/article-page/article-page.jsx"

class RootPage extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("menu", "menu");
  }

  componentDidUpdate() {
    this.checkForForward();
  }

  checkForForward() {
    let first = this.props.params.first;
    let second = this.props.params.second;
    let third = this.props.params.third;
    if (first && second && !third && first === "business-guide") {
      let subSectionData = findSubSection(this.props.menu, first, second);
      if (subSectionData && subSectionData.children && subSectionData.children[0]) {
        let page = subSectionData.children[0].url;
        this.props.navigationActions.locationChange(path.join("/", first, second, third), {});
      }
    }
  }

  renderPageOnLineage(pageLineage) {
    let nodeId = _.last(pageLineage).node;
    if (nodeId) {
      return (<Page lineage={pageLineage} nodeId={nodeId}/>);
    } else {
      return (<ErrorPage/>);
    }
  }

  renderPage(first, second, third, fourth, fifth) {
    let pageLineage = findPageLineage(this.props.menu, _.compact([first, second, third]));
    if (first === "document") {
      let split = second.split("-");
      let type = split[0];
      let id = split[1];
      let rest = split.slice(2, split.length);
      return (<DocumentPage type={type} id={id} title={rest}/>);
  } else if (first === "article") {
      let year = second;
      let month = third;
      let day = fourth;
      let title = fifth;
      return (<ArticlePage year={year} month={month} day={day} title={title}/>);
    } else if (this.props.menu) {
      if (first && second && third) {
        if (pageLineage && pageLineage.length === 3) {
          return this.renderPageOnLineage(pageLineage)
        } else {
          return (<ErrorPage/>);
        }
      } else if (first && second) {
        if (pageLineage && pageLineage.length === 2) {
          return this.renderPageOnLineage(pageLineage)
        } else {
          return (<ErrorPage/>);
        }
      } else if (first) {
        let sectionData = findSection(this.props.menu, first);
        if (sectionData) {
          return (<SectionPage sectionData={sectionData}/>);
        } else if (sectionData !== null) {
          return (<ErrorPage/>);
        }
      }

    }
    return (<div/>);
  }

  render() {
    return this.renderPage(this.props.params.first, this.props.params.second, this.props.params.third, this.props.params.fourth, this.props.params.fifth);
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    menu: _.get(reduxState, "contentReducer.menu")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch),
    navigationActions: bindActionCreators(NavigationActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(RootPage);
