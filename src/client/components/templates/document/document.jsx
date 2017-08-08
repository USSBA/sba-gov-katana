import React from 'react'
import s from './document.scss'

import DocumentArticle from '../../molecules/document-article/document-article.jsx'
import RelatedDocumentCards from "../../organisms/related-document-cards/related-document-cards.jsx";

class DocumentPage extends React.Component {

  render() {

    const {document:doc} = this.props;

    let versionNumber = doc.files.length;
    const previousVersionsList = doc.files.map((obj, index) => {
      versionNumber--;
      return (
          <li key={index}>
            <strong>Version {versionNumber + 1}</strong> <strong>|</strong> Effective: {obj.effectiveDate}. <a href={obj.url} target="_blank">Download PDF <i className="fa fa-file-pdf-o" aria-hidden="true" /></a>
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
