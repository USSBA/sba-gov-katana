import React from 'react'
import BusinessGuideArticle from "../templates/business-guide-article/business-guide-article.jsx";
import * as RestContentActions from "../../actions/rest-content.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class SamplePage extends React.Component {

  componentWillMount() {
      this.props.actions.fetchContentIfNeeded("node", 5);
  }

  render() {
      if(this.props.data){
          return (<BusinessGuideArticle title={this.props.data.title} paragraphs={this.props.data.paragraphs}/>);
      }else{
          return (<div>Loading....</div>);
      }
  }
}

function mapReduxStateToProps(reduxState) {
  return {data: _.get(reduxState, "restContent.node[5]")};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(SamplePage);
