import React from "react";

import styles from "./document.scss";
import { VersionsList } from "atoms";
import { DocumentArticle } from "molecules";
import { RelatedDocumentCards } from "organisms";
import { logPageEvent } from "../../../services/analytics.js";

class DocumentPage extends React.Component {

  render() {
    // Use doc instead of document to avoid potential conflicts.
    const {
      document: doc
    } = this.props;
    if (!doc) return <div></div>;
    return (
      <div className={styles.document}>
        <DocumentArticle
          data={doc}
          type="document"
        />
        <VersionsList doc={doc} />
        <RelatedDocumentCards data={doc}/>
      </div>
    );
  }
}

export default DocumentPage;
