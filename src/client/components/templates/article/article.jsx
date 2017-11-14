import React from 'react'
import { DocumentArticle } from 'molecules'
import { RelatedDocumentCards } from 'organisms'
import s from './article.scss'

class Article extends React.Component {
  render() {
    let toRender = <div />
    if (this.props.article) {
      return (
        <div>
          <DocumentArticle data={this.props.article} type="article" />
          <RelatedDocumentCards data={this.props.article} />
        </div>
      )
    }
    return toRender
  }
}

export default Article
