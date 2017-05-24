import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../actions/content.js";
import * as LocationChangeActions from '../../actions/location-change.js';
import _ from 'lodash';
import {findPageLineage, findSubSection, findSection} from "../../services/menu.js";
import Page from "./page.jsx";
import SectionPage from "./section-page/section-page.jsx";
import path from "path"

class RootPage extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("menu", "menu");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate", arguments);
    this.checkForForward();
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps", arguments);
  }

  checkForForward() {
    console.log("this.props", this.props);
    if (this.props.params.section && this.props.params.subsection && !this.props.params.page) {
      let subSectionData = findSubSection(this.props.menu, this.props.params.section, this.props.params.subsection);
      console.log("subSectionData", subSectionData);
      if (subSectionData && subSectionData.children && subSectionData.children[0]) {
        let page = subSectionData.children[0].url;
        this.props.locationActions.locationChange(path.join("/", this.props.params.section, this.props.params.subsection, page),{});
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
    }
    return (<div/>);
  }

  render() {
    console.log("RootPage render", this.props);
    if (this.props.params.section && this.props.params.subsection) {
      return this.renderPage(this.props.params.section, this.props.params.subsection, this.props.params.page);
    } else if (this.props.params.section) {
      let sectionData = findSection(this.props.menu, this.props.params.section);
      return (<SectionPage sectionData={sectionData}/>);
    }
    return (
      <div></div>
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
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(RootPage);
