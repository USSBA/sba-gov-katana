import React from 'react'
import TextSection from "../../molecules/text-section/text-section.jsx";

const ParagraphTypeToBeImplemented = ({ data}) => {
  return (
    <p>{JSON.stringify(data)}</p>
  );
}

class BusinessGuideArticle extends React.Component {

  componentWillMount() {}

  makeParagraphs(paragraphData) {
    let paragraphs = [];
    paragraphs = paragraphData.map(function(item, i) {
      if (item && item.type) {
        if (item.type === "textSection") {
            return (<TextSection key={i} text={item.text}/>);
        } else {
          return (<ParagraphTypeToBeImplemented key={i} data={item}/>);
        }
      } else {
        return (<ParagraphTypeToBeImplemented key={i} data={item}/>);
      }
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
