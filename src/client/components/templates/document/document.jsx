import React from "react";
import {DocumentArticle} from "molecules";
import {RelatedDocumentCards} from "organisms";
import s from "./document.scss";
import {logPageEvent} from "../../../services/analytics.js";

class DocumentPage extends React.Component {

  render() {
    // Use doc instead of document to avoid potential conflicts.
    const {
      document: doc
    } = this.props;
    if (doc) {
      const allVersionsList = doc.files.map((file, index) => {
        const { effectiveDate, fileUrl, version } = file;
        const versionMessage =`
          Version ${doc.documentIdNumber || ''}${version ? ' ' : ': '}${version || 'N/A'}
        `;
        const effectiveDateMessage = `Effective: ${effectiveDate || 'N/A'}`;
        const eventConfig = {
          category: 'Document-Version',
          action: `docname - ${doc.title}: previous version #${version || 'N/A'}`
        };

        return (
          <li key={index}>
            <strong>{versionMessage}</strong>
            <strong>|</strong>
            {effectiveDateMessage}.
            <a href={fileUrl} onClick={() => {logPageEvent(eventConfig)}} target="_blank">Download PDF
              <i className="fa fa-file-pdf-o" aria-hidden="true"/>
            </a>
          </li>
        );
      });

      return (
        <div>
          <DocumentArticle data={doc} type="document"/>
          <div className={s.allVersionsList}>
            <h3>All versions</h3>
            <ul>
              {allVersionsList}
            </ul>
            <hr className={s.hr}/>
          </div>
          <RelatedDocumentCards data={doc}/>

        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default DocumentPage;
