import React from 'react'
import s from './document.scss'

import DocumentArticle from '../../molecules/document-article/document-article.jsx'
import RelatedDocumentCards from "../../organisms/related-document-cards/related-document-cards.jsx";

class DocumentPage extends React.Component {

  render() {

    const {document:doc} = this.props;

    const previousVersionsList = doc.files.map((file, index) => {

      const versionMessage = file.version ? `Version ${file.version}` : "Version: N/A";
      const effectiveDateMessage = "Effective: " + (file.effectiveDate || "N/A");

      return (
          <li key={index}>
            <strong>{versionMessage}</strong> <strong>|</strong> {effectiveDateMessage}. <a href={file.url} target="_blank">Download PDF <i className="fa fa-file-pdf-o" aria-hidden="true" /></a>
          </li>
        );
    });

    return (
      <div>

      { doc &&

        <div>

          <DocumentArticle data={this.props.document}/>

            <div className={s.previousVersionsList}>

              <h3>Previous versions</h3>

              <ul>
                {previousVersionsList}
              </ul>

              <hr className={s.hr}/>

            </div>

          <RelatedDocumentCards documentObj={this.props.document}/>

        </div>

      }{!doc &&

        <div>Loading....</div>

      }

      </div>
    );
  }
}

export default DocumentPage
