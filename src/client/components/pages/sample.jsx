import React from 'react'
import Document from "../templates/document/document.jsx";
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
      return (<Document document={this.props.data}/>);
    } else {
      return (
        <div>Loading....</div>
      );
    }
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
