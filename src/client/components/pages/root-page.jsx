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

class RootPage extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("menu", "menu");
  }

  componentDidUpdate() {
    this.checkForForward();
  }

  checkForForward() {
    if (this.props.params.section && this.props.params.subsection && !this.props.params.page && this.props.params.section !== "funding-programs") {
      let subSectionData = findSubSection(this.props.menu, this.props.params.section, this.props.params.subsection);
      if (subSectionData && subSectionData.children && subSectionData.children[0]) {
        let page = subSectionData.children[0].url;
        this.props.navigationActions.locationChange(path.join("/", this.props.params.section, this.props.params.subsection, page), {});
      }
    }
  }

  renderPage(section, subsection, page) {
    let pageLineage = findPageLineage(this.props.menu, _.compact([section, subsection, page]));
    if (pageLineage && pageLineage.length > 1) {
      let nodeId = _.last(pageLineage).node;
      if (nodeId) {
        return (<Page lineage={pageLineage} nodeId={nodeId}/>);
      }
    } else if (!page && section === "funding-programs") {
      return (<Page section={section} nodeId={subsection}/>);
    }else if(pageLineage !== null){
        return (<ErrorPage/>);
    }

    return (<div/>);
  }

  render() {
    if (this.props.params.section && this.props.params.subsection) {
      return this.renderPage(this.props.params.section, this.props.params.subsection, this.props.params.page);
    } else if (this.props.params.section) {
      let sectionData = findSection(this.props.menu, this.props.params.section);
      if(sectionData)
        return (<SectionPage sectionData={sectionData}/>);
      else if(sectionData !== null)
        return(<ErrorPage/>);
    }
    return (
      <div/>
    );
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
