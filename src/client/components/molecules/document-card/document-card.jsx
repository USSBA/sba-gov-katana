import React from "react";
import {DecorativeDash, PdfIcon} from "../../atoms";
import s from "./document-card.scss";
import DocumentType from "../../atoms/document-type/document-type.jsx";
import _ from 'lodash'

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
        <div className={"document-card-container " + s.container}>
          <div>
            <div className={s.documentTypeContainer}>
              <DocumentType className={s.documentType} type={idData.idType} number={idData.number}/>
            </div>
            <h6 className={"document-card-title " + s.title}>
              {doc.title}
            </h6>

            {this.props.showDetails
              ? <div>
                  <ActivityRow doc={doc}/>
                  <ProgramsRow doc={doc}/>
                  <SummaryRow doc={doc}/>
                </div>
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

const ActivityRow = props => props.doc.activities && props.doc.activities.length > 0
  ? <div className={s.row}>
      <div className={s.columnOne}>Activity:</div>
      <div className={s.columnTwo}>
        {props.doc.activities.join(", ")}
      </div>
    </div>
  : null;

const ProgramsRow = props => props.doc.programs
  ? <div className={s.row}>
      <div className={s.columnOne}>Program:</div>
      <div className={s.columnTwo}>
        {props.doc.programs.join(", ")}
      </div>
    </div>
  : null;

const SummaryRow = props => props.doc.summary
  ? <div className={s.row}>
      <div className={s.columnOne}>Summary:</div>
      <div className={s.columnTwo}>
        {props.doc.summary}
      </div>
    </div>
  : null;

DocumentCard.propTypes = {};

export default DocumentCard;
