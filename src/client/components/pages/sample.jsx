import React from 'react'
import BusinessGuideArticle from "../templates/business-guide-article/business-guide-article.jsx";
import DocumentPage from "../templates/document-page/document-page.jsx"
import * as RestContentActions from "../../actions/rest-content.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class SamplePage extends React.Component {

  componentWillMount() {
    let id = this.props.params.id;
    if (id > 0) {
      this.props.actions.fetchContentIfNeeded("node", this.props.params.id);
    } else {}
  }

  render() {
    if (this.props.data) {
      // return (<BusinessGuideArticle title={this.props.data.title} paragraphs={this.props.data.paragraphs} summary={this.props.data.summary}/>);
      return (<DocumentPage data={this.props.data}/>);
    } else {
      return (
        <div>Loading....</div>
      );
    }
  }
}

SamplePage.defaultProps = {
  data: {
    title: "Test Page",
    summary: "test page thing",
    paragraphs: []
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    data: _.get(reduxState, "restContent.node[" + ownProps.params.id + "]")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(SamplePage);
