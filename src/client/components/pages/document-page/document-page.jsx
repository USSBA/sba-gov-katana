import React from "react";
import s from "./document-page.scss";
import * as ContentActions from "../../../actions/content.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DocumentArticle from "../../molecules/document-article/document-article.jsx";
import RelatedDocumentCards from "../../organisms/related-document-cards/related-document-cards.jsx";
import localDocuments from "../../../../models/dao/sample-data/documents.js";

class DocumentPage extends React.Component {
  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("documents", "documents");
  }

  render() {
    return (
      <div>
        {this.props.document
          ? <div>
              <DocumentArticle data={this.props.document} />
              <RelatedDocumentCards documentObj={this.props.document} />
            </div>
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
