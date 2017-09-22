import React from "react";
import _ from "lodash";
import {
  DecorativeDash,
  DocumentType,
  PdfIcon,
  BasicLink
} from "atoms";
import s from "./document-card.scss";
import {logPageEvent} from "../../../services/analytics.js";

class DocumentCard extends React.Component {
  getLatestFile() {
    if (this.props.data && this.props.data.files) {
      return _.chain(this.props.data.files).sortBy(['version']).head().value();
    } else {
      return null;
    }
  }

  makeDownloadLink() {
    const latestFile = this.getLatestFile();
    const title = this.props.data.title;
    if (latestFile) {
      return (
        <div className={"document-card-download " + s.download}>
          <a onClick={() => {
            logPageEvent({category: "Document-Download-Module", action: `docname - ${title}: Download PDF`});
            window.open(latestFile.fileUrl, "_blank");
          }} className={s.link}>
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
    if (doc.activities && doc.activities.length > 0 && _.includes(this.props.fieldsToShowInDetails, "Activity")) {
      rows.push({name: "Activity:", value: doc.activities.join(", ")});
    }
    if (doc.programs && _.includes(this.props.fieldsToShowInDetails, "Program")) {
      rows.push({name: "Program:", value: doc.programs.join(", ")});
    }

    if (doc.published && _.includes(this.props.fieldsToShowInDetails, "Published")) {
        let publishedDate = new Date(doc.updated);
        let publisheDateString = publishedDate.getMonth() + "/" + publishedDate.getDate() + "/" + publishedDate.getYear();
        rows.push({name: "Published:", value: publisheDateString});
    }
    if (doc.summary && _.includes(this.props.fieldsToShowInDetails, "Summary")) {
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
    const doc = this.props.data;
    if (doc) {
      const idData = doc.documents && doc.documents.length > 0
        ? doc.documents[0]
        : {
          idType: "UNK",
          number: "UNK"
        };

      const titleClickEventConfig = {
        category: "Document-Download-Module",
        action: `docname - ${doc.title}: Document Landing Page`
      };

      return (
        <div className={"document-card-container " + (this.props.showBorder ? " " + s.container : "")}>
          <div>
            <div className={s.documentTypeContainer}>
              <DocumentType className={s.documentType} type={doc.documentIdType} number={doc.documentIdNumber}/>
            </div>
            <div>
            </div>
            <BasicLink url={"/"+this.props.type.substring(0,this.props.type.length-1)+"/"+doc.url} eventConfig={titleClickEventConfig}>
                <h6 className={"document-card-title " + s.title}>
                    {doc.title}
                </h6>
            </BasicLink>
            {this.props.showDetails
              ? this.makeTable(this.props.data)
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
