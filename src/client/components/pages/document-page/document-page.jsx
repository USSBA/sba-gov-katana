import React from "react";
import s from "./document-page.scss";
import * as ContentActions from "../../../actions/content.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Document from "../../templates/document/document.jsx";

import localDocuments from "../../../../models/dao/sample-data/documents.js";

class DocumentPage extends React.Component {
  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("documents", "documents");
  }

  render() {
    return (
      <div>
        {this.props.document
          ? <Document document={this.props.document}/>
          : <div>LOADING DOCUMENT DATA</div>}
      </div>
    );
  }
}

DocumentPage.defaultProps = {
  document: localDocuments[0]
};

function mapReduxStateToProps(reduxState, ownProps) {
  return { documents: reduxState.contentReducer["documents"] };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentPage);
