import React from 'react'

class BusinessGuideArticle extends React.Component {

  componentWillMount() {}

  makeParagraphs(paragraphData) {
    let paragraphs = [];
    paragraphs = paragraphData.map(function(item, i) {
      return (
        <p key={i}>{JSON.stringify(item)}</p>
      );
    });
    return paragraphs;
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    return (
      <div>{paragraphs}</div>
    );
  }
}

export default BusinessGuideArticle;
