import React from 'react'
import s from './article.scss'
import DocumentArticle from '../../molecules/document-article/document-article.jsx'
import RelatedDocumentCards from "../../organisms/related-document-cards/related-document-cards.jsx";

class Article extends React.Component {

  render() {
    let toRender = (
      <div></div>
    );
    if (this.props.article) {
      return (
        <div>
          <DocumentArticle data={this.props.article}/>
          <RelatedDocumentCards data={this.props.article}/>
        </div>
      );
    }
    return toRender;
  }
}

export default Article
