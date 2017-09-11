import React from "react";
import s from "./document-page.scss";
import * as ContentActions from "../../../actions/content.js";
import ErrorPage from "../error-page/error-page.jsx";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Document from "../../templates/document/document.jsx";

class DocumentPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    let url = this.props.url;
    if (url) {
      this.props.actions.fetchContentIfNeeded("documents", "documents", {url: url});
    }
  }

  render() {
    if (this.props.url && this.props.document !== null) {
      if (this.props.document) {
        return (<Document document={this.props.document}/>);
      } else {
        return (
          <div>Loading Document....</div>
        );
      }
    } else {
      return (<ErrorPage/>);
    }
  }
}

DocumentPage.defaultProps = {
  url: {}
};

function mapReduxStateToProps(reduxState, ownProps) {
  let documentStoreValue = reduxState.contentReducer["documents"];
  if (documentStoreValue === null && !this.props.document) {
    return {document: null};
  } else if (documentStoreValue && documentStoreValue.items && documentStoreValue.items.length > 0) {
    return {document: documentStoreValue.items[0]};
  } else {
    return {};
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentPage);
