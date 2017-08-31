import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Lookup} from "molecules";
import * as ContentActions from "../../../actions/content.js";
import style from "./document-lookup-page.scss";

class DocumentLookupPage extends React.Component {

  render() {
    return (
      <div>
        <Lookup title="Documentation Lookup" type="documents"/>
      </div>
    );
  }

}

function mapReduxStateToProps(reduxState, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentLookupPage);
