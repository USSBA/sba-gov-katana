import React from 'react'
import s from './article.scss'

class Article extends React.Component {

  render() {
    return (
      <div className={"article " + s.container}>This will show the article created on '{this.props.year}-{this.props.month}-{this.props.day}'
         with the title '{this.props.title}'</div>
    );
  }
}

export default Article
