import React from "react";
import s from "./document-card-collection.scss";
import _ from "lodash";
import DocumentCard from "../../molecules/document-card/document-card.jsx";

class DocumentCardCollection extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getLatestFile(doc) {
    return doc.files.reduce((acc, file) => {
      return file.version > acc.version ? file : acc;
    });
  }

  downloadClick(latestFile) {
    window.open(latestFile.url, "_blank");
  }

  render() {
    return (
      <div className={"document-card-collection " + s.cardCollection}>
        {this.props.documents.map((doc, index) => {
          const latestFile = this.getLatestFile(doc);
          let documentCardProps = {
            title: doc.title,
            type: doc.documentIdType,
            number: doc.documentIdNumber,
            latestFile: latestFile,
            downloadClick: () => this.downloadClick(latestFile)
          };
          this.props.documentLookup
            ? (documentCardProps = {
                ...documentCardProps,
                programs: doc.programs,
                activities: doc.activities,
                summary: doc.summary
              })
            : null;
          return <DocumentCard key={index} {...documentCardProps} />;
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
