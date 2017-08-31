import React from "react";
import _ from "lodash";
import {
  DecorativeDash,
  DocumentType,
  PdfIcon
} from "atoms";
import s from "./document-card.scss";

class DocumentCard extends React.Component {
  getLatestFile() {
    if (this.props.doc && this.props.doc.files) {
      return _.chain(this.props.doc.files).sortBy(['version']).head().value();
    } else {
      return null;
    }
  }

  makeDownloadLink() {
    let latestFile = this.getLatestFile();
    if (latestFile) {
      return (
        <div className={"document-card-download " + s.download}>
          <a onClick={() => window.open(latestFile.fileUrl, "_blank")} className={s.link}>
            Download PDF
          </a>
          <PdfIcon/>
        </div>
      );
    } else {
      return undefined;
    }
  }

  makeTable(doc) {
    let rows = [];
    if (doc.activities && doc.activities.length > 0) {
      rows.push({name: "Activity:", value: doc.activities.join(", ")});
    }
    if (doc.programs) {
      rows.push({name: "Program:", value: doc.programs.join(", ")});
    }
    if (doc.summary) {
      rows.push({name: "Summary:", value: doc.summary});
    }

    return (
      <div>
        <div className={s.dash}>
          <DecorativeDash/>
        </div>
      <table>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td className={s.columnOne}>{row.name}</td>
                <td className={s.columnTwo}>{row.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }

  render() {
    const doc = this.props.doc;
    if (doc) {
      const idData = doc.documents && doc.documents.length > 0
        ? doc.documents[0]
        : {
          idType: "UNK",
          number: "UNK"
        };

      return (
        <div className={"document-card-container " + (this.props.showBorder ? " " + s.container : "")}>
          <div>
            <div className={s.documentTypeContainer}>
              <DocumentType className={s.documentType} type={doc.documentIdType} number={doc.documentIdNumber}/>
            </div>
            <div>
            </div>
            <a href={"/document/"+doc.url}>
                <h6 className={"document-card-title " + s.title}>
                  {doc.title}
                </h6>
            </a>
            {this.props.showDetails
              ? this.makeTable(this.props.doc)
              : null}
            {this.makeDownloadLink()}
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

DocumentCard.propTypes = {
  showBorder: React.PropTypes.bool
};

DocumentCard.defaultProps = {
  showBorder: true
};

export default DocumentCard;
