import React from "react";
import { DecorativeDash, PdfIcon } from "../../atoms";
import s from "./document-card.scss";
import DocumentType from "../../atoms/document-type/document-type.jsx";

class DocumentCard extends React.Component {
  getLatestFile() {
    return this.props.doc.files
      ? this.props.doc.files.reduce((acc, file) => {
          return file.version > acc.version ? file : acc;
        })
      : {};
  }

  downloadClick() {
    let latestFile = this.getLatestFile();
    window.open(latestFile.url, "_blank");
  }

  render() {
    const doc = this.props.doc;
    return (
      <div className={"document-card-container " + s.container}>
        {doc
          ? <div>
              <div className={s.documentTypeContainer}>
                <DocumentType
                  className={s.documentType}
                  type={doc.documentIdType}
                  number={doc.documentIdNumber}
                />
              </div>
              <h6 className={"document-card-title " + s.title}>
                {doc.title}
              </h6>

              {this.props.showDetails
                ? <div>
                    <ActivityRow doc={doc} />
                    <ProgramsRow doc={doc} />
                    <SummaryRow doc={doc} />
                  </div>
                : null}

              <div className={"document-card-download " + s.download}>
                <a onClick={() => this.downloadClick()} className={s.link}>
                  Download PDF
                </a>
                <PdfIcon />
              </div>
            </div>
          : null}
      </div>
    );
  }
}

const ActivityRow = props =>
  props.doc.activities && props.doc.activities.length > 0
    ? <div className={s.row}>
        <div className={s.columnOne}>Activity:</div>
        <div className={s.columnTwo}>
          {props.doc.activities.join(", ")}
        </div>
      </div>
    : null;

const ProgramsRow = props =>
  props.doc.programs
    ? <div className={s.row}>
        <div className={s.columnOne}>Program:</div>
        <div className={s.columnTwo}>
          {props.doc.programs.join(", ")}
        </div>
      </div>
    : null;

const SummaryRow = props =>
  props.doc.summary
    ? <div className={s.row}>
        <div className={s.columnOne}>Summary:</div>
        <div className={s.columnTwo}>
          {props.doc.summary}
        </div>
      </div>
    : null;

DocumentCard.propTypes = {};

export default DocumentCard;
