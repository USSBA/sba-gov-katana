import React from 'react';
import * as ContentActions from "../../../actions/content.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import s from './document-lookup-page.scss';

class DocumentLookupPage extends React.Component {

  componentWillMount() {}
  render() {
    return (
      <div>Document Lookup</div>
    )
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentLookupPage);
