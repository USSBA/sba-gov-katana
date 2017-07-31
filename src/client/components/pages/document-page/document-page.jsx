import React from 'react';
import s from './document-page.scss';
import * as RestContentActions from "../../../actions/rest-content.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class DocumentPage extends React.Component {

  componentWillMount() {}
  render() {
    return (
      <div>this will show a document matching {JSON.stringify(this.props)}</div>
    )
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentPage);
