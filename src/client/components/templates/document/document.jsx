import React from 'react'
import s from './document.scss'

import DocumentArticle from '../../molecules/document-article/document-article.jsx'
import RelatedDocumentCards from "../../organisms/related-document-cards/related-document-cards.jsx";

class DocumentPage extends React.Component {

  render() {
    if (this.props.document) {
      const allVersionsList = this.props.document.files.map((file, index) => {

        const versionMessage = file.version
          ? `Version ${file.version}`
          : "Version: N/A";
        const effectiveDateMessage = "Effective: " + (file.effectiveDate || "N/A");

        return (
          <li key={index}>
            <strong>{versionMessage}</strong>
            <strong>|</strong>
            {effectiveDateMessage}.
            <a href={file.fileUrl} target="_blank">Download PDF
              <i className="fa fa-file-pdf-o" aria-hidden="true"/>
            </a>
          </li>
        );
      });

      return (
        <div>
          <DocumentArticle data={this.props.document}/>
          <div className={s.allVersionsList}>
            <h3>All versions</h3>
            <ul>
              {allVersionsList}
            </ul>
            <hr className={s.hr}/>
          </div>
          <RelatedDocumentCards data={this.props.document}/>

        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default DocumentPage
