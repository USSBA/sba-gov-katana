import React from "react";
import s from "./document-card-collection.scss";
import _ from "lodash";
import DocumentCard from "../../molecules/document-card/document-card.jsx";

class DocumentCardCollection extends React.Component {
  render() {
    return (
      <div className={"document-card-collection " + s.cardCollection}>
        {this.props.documents.map((doc, index) => {
          return <DocumentCard key={index} doc={doc} showDetails={this.props.showDetails} />;
        })}
      </div>
    );
  }
}

DocumentCardCollection.propTypes = {
  documents: React.PropTypes.array
};

DocumentCardCollection.defaultProps = {
  showDetails: true
};
export default DocumentCardCollection;
