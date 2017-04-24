import React from 'react'
import BusinessGuideArticle from "../templates/business-guide-article/business-guide-article.jsx";
import * as RestContentActions from "../../actions/rest-content.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class SamplePage extends React.Component {

  componentWillMount() {
      this.props.actions.fetchContentIfNeeded("node", this.props.params.id);
  }

  render() {
      if(this.props.data){
          return (<BusinessGuideArticle title={this.props.data.title} paragraphs={this.props.data.paragraphs} summary={this.props.data.summary}/>);
      }else{
          return (<div>Loading....</div>);
      }
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {data: _.get(reduxState, "restContent.node["+ownProps.params.id+"]")};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(SamplePage);
