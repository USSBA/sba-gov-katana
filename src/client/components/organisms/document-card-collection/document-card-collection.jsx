import React from "react";
import s from "./document-card-collection.scss";
import _ from "lodash";
import DocumentCard from "../../molecules/document-card/document-card.jsx";

class DocumentCardCollection extends React.Component {
  render() {
    return (
      <div className={"document-card-collection " + s.cardCollection}>
        {this.props.documents.map((doc, index) => {
          return <DocumentCard key={index} doc={doc} documentLookup={this.props.documentLookup} />;
        })}
      </div>
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
