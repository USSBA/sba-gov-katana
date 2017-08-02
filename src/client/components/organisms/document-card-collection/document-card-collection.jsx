import React from "react"
import s from "./document-card-collection.scss";
import _ from "lodash";
import DocumentCard from "../../molecules/document-card/document-card.jsx";
console.log(DocumentCard);

class DocumentCardCollection extends React.Component {

  constructor() {
    super();
    this.state = {}
  }
  render() {
    return (
      <div>{this.props.documents.map((document, index) => {
          return (
            <div className={s.card} key={index}><DocumentCard  {...document}/></div>
          );
        })}</div>
    );
  }
}

DocumentCardCollection.propTypes = {
  documents: React.PropTypes.array
};

DocumentCardCollection.defaultProps = {
  documents: ["test"]
};
export default DocumentCardCollection;
