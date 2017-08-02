import React from "react";
import s from "./document-page.scss";
import * as ContentActions from "../../../actions/content.js";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import DocumentArticle from "../../molecules/document-article/document-article.jsx";

class DocumentPage extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("documents", "documents");
  }

  render() {
    return (
      <div>
        {this.props.documents
          ? <DocumentArticle data={this.props.documents[0]}/>
          : <div>LOADING DOCUMENT DATA</div>}
      </div>
    );
  }
}

DocumentPage.defaultProps = {
  documents: []
};

function mapReduxStateToProps(reduxState, ownProps) {
  return {documents: reduxState.contentReducer["documents"]};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentPage);
