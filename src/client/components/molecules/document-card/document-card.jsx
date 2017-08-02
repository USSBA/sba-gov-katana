import React from "react";
import { DecorativeDash, PdfIcon } from "../../atoms";
import s from "./document-card.scss";
import DocumentType from "../../atoms/document-type/document-type.jsx";

class DocumentCard extends React.Component {
  render() {
    const doc = this.props.doc;
    return (
      <div className={s.container}>
        {doc
          ? <div>
              <div className={s.documentTypeContainer}>
                <DocumentType
                  className={s.documentType}
                  type={doc.documentIdType}
                  number={doc.documentIdNumber}
                />
              </div>
              <h6 className={s.title}>
                {doc.title}
              </h6>

              {this.props.documentLookup
                ? <div>
                    <ActivityRow doc={doc} />
                    <ProgramsRow doc={doc} />
                    <SummaryRow doc={doc} />
                  </div>
                : null}

              <div className={s.download}>
                <a onClick={() => doc.downloadClick(doc.latestFile)} className={s.link}>
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

DocumentCard.defaultProps = {
  type: "MyType",
  summary: "Document Summary",
  title: "Document Title ABC",
  programs: ["Program 1", "Program 2"],
  documents: [
    {
      idType: "Authorization",
      number: "00 01 A",
      type: "documentId"
    }
  ],
  activities: []
};

DocumentCard.propTypes = {};

export default DocumentCard;
