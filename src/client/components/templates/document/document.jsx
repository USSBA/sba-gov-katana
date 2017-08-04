import React from 'react'
import s from './document.scss'

import DocumentArticle from '../../molecules/document-article/document-article.jsx'
import RelatedDocumentCards from "../../organisms/related-document-cards/related-document-cards.jsx";

class DocumentPage extends React.Component {

  render() {
    if (this.props.document) {
      return (
        <div>
          <DocumentArticle data={this.props.document}/>
          <RelatedDocumentCards documentObj={this.props.document}/>
        </div>
      );

    } else {
      return (
        <div>Loading....</div>
      );
    }
  }
}

export default DocumentPage
