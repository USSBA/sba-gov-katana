import React from 'react'
import s from './article.scss'

class Article extends React.Component {

  render() {
    return (
      <div className={"article " + s.container}>This will show the article {JSON.stringify(this.props.article)}</div>
    );
  }
}

export default Article
