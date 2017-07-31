import React from 'react'
import BusinessGuideArticle from "../templates/business-guide-article/business-guide-article.jsx";
import ProgramPage from "../templates/program-page/program-page.jsx";
import * as RestContentActions from "../../actions/rest-content.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class Page extends React.Component {

  componentWillMount() {
    let id = this.props.nodeId;
    if (id > 0) {
      this.props.actions.fetchContentIfNeeded("node", id);
    }
  }

  render() {
    let section = this.props.lineage[0].url;
    if (this.props.data && this.props.lineage) {
      if (section === "business-guide") {
        return (<BusinessGuideArticle title={this.props.data.title} paragraphs={this.props.data.paragraphs} summary={this.props.data.summary} lineage={this.props.lineage}/>);
      } else if (section === "funding-programs") {
        let heroData = undefined
        if (this.props.data) {
          heroData = {
            title: this.props.data.title,
            summary: this.props.data.summary,
            buttons: this.props.data.buttons,
            bannerImage: this.props.data.bannerImage
          }
        }
        return (<ProgramPage heroData={heroData} title={this.props.data.title} paragraphs={this.props.data.paragraphs} lineage={this.props.lineage}/>);
      }
    }
    return (<div/>);
  }
}

Page.defaultProps = {
  lineage: [
    {
      url: "default"
    }
  ],
  nodeId: 0
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    data: _.get(reduxState, "restContent.node[" + ownProps.nodeId + "]")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Page);
