import React from 'react';
import * as ContentActions from "../../../actions/content.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import s from './document-lookup-page.scss';
import Lookup from "../../molecules/lookup/lookup.jsx"

class DocumentLookupPage extends React.Component {

  componentWillMount() {}

  render() {
    
    return (
      <div>
        <Lookup title="Document Lookup" type="document" />
      </div>
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
