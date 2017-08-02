import React from "react";
import { DecorativeDash, PdfIcon } from "../../atoms";
import s from "./document-card.scss";
import DocumentType from "../../atoms/document-type/document-type.jsx";

class DocumentCard extends React.Component {
    render() {
        console.log(this.props.latestFile);
        const ActivityRow =
            this.props.activities && this.props.activities.length > 0
                ? <div className={s.row}>
                      <div className={s.columnOne}>Activity:</div>
                      <div className={s.columnTwo}>
                          {this.props.activities.join(", ")}
                      </div>
                  </div>
                : undefined;

        return (
            <div className={s.container}>
                <div className={s.documentTypeContainer}>
                   <DocumentType className={s.documentType} type={this.props.type} number={this.props.number}/>
                </div>
                <div>
                    <h6 className={s.title}>
                        {this.props.title}
                    </h6>
                </div>

                {this.props.programs ||
                this.props.activities ||
                this.props.summary
                    ? <div>
                          <div className={s.dash}>
                              <DecorativeDash />
                          </div>
                          <div className={s.details}>
                              {this.props.programs
                                  ? <div className={s.row}>
                                        <div className={s.columnOne}>
                                            Program:
                                        </div>
                                        <div className={s.columnTwo}>
                                            {this.props.programs.join(", ")}
                                        </div>
                                    </div>
                                  : null}
                              {this.props.activities ? ActivityRow : null}
                              {this.props.summary
                                  ? <div className={s.row}>
                                        <div className={s.columnOne}>
                                            Summary:
                                        </div>
                                        <div className={s.columnTwo}>
                                            {this.props.summary}
                                        </div>
                                    </div>
                                  : null}
                          </div>
                      </div>
                    : null}

                <div className={s.download}>
                    <a
                        onClick={() =>
                            this.props.downloadClick(this.props.latestFile)}
                        className={s.link}
                    >
                        Download PDF
                    </a>
                    <PdfIcon />
                </div>
            </div>
        );
    }
}

DocumentCard.propTypes = {};

export default DocumentCard;
