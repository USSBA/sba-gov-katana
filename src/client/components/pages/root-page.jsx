import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../actions/content.js"
import _ from 'lodash';
import {findPageLineage, findSubSection, findSection} from "../../services/menu.js";
import Page from "./page.jsx";
import SubSectionPage from "./subsection-page/subsection-page.jsx";
import SectionPage from "./section-page/section-page.jsx";

class RootPage extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("menu", "menu");
  }

  render() {
    if (this.props.params.section && this.props.params.subsection && this.props.params.page) {
      let pageLineage = findPageLineage(this.props.menu, this.props.params.section, this.props.params.subsection, this.props.params.page);
      if (pageLineage && pageLineage.pageData) {
        let nodeId = pageLineage.pageData.node;
        return (<Page lineage={pageLineage} nodeId={nodeId}/>);
      } else {
        return (<div/>);
      }
    } else if (this.props.params.section && this.props.params.subsection) {
      let subSectionData = findSubSection(this.props.menu, this.props.params.section, this.props.params.subsection);
      return (<SubSectionPage subSectionData={subSectionData}/>);
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
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(RootPage);
