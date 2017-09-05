import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import queryString from "querystring";
import {
  DocumentType,
  DecorativeDash,
  Button,
  BasicLink
} from "atoms";
import {TextSection} from "molecules";

import * as NavigationActions from "../../../actions/navigation.js";

import s from "./document-article.scss";

export class DocumentArticle extends React.Component {

  getNewestFile() {
    return this.props.data.files
      ? this.props.data.files.reduce((acc, file) => {
        return file.version > acc.version
          ? file
          : acc
      })
      : {fileUrl: this.props.data.file};
  }

  downloadClick(newestFile) {
      if(newestFile && newestFile.fileUrl){
          window.open(newestFile.fileUrl, '_blank')
      }
  }

  formatDate(date) {
    return moment(date).format('MMM D, YYYY')
  }

  handleRelatedPrograms(program){
    let params = {program: program}
    this.props.actions.locationChange("/document/?" + queryString.stringify(params))
  }

  render() {
    const data = this.props.data
    const body = data.body && typeof data.body === "string" ? data.body: "";
    if (data) {
      const newestFile = this.getNewestFile()
      let newestFileExtension = "pdf";
      if(newestFile && newestFile.fileUrl){
          newestFileExtension = newestFile.fileUrl.split(".")[1];
      }
      let documentTypeString = null;
      switch(data.type){
          case "document" : documentTypeString = data.documentIdType; break;
          default: documentTypeString = null; break;
      }
      return (
        <div className={"document-article " + s.page}>
          {documentTypeString ? <DocumentType type={documentTypeString} number={data.documentIdNumber}/> : undefined}
          <h1 className={"document-article-title " + s.title + " " + (documentTypeString? s.marginTop:"")}>{data.title}</h1>
          <p className={s.dates}>
            {data.updated ? <span className={s.date}>Last Updated {moment.unix(data.updated).format('MMM D, YYYY')}</span> : null}
            {!newestFile.expirationDate || !newestFile.effectiveDate ? null : <span className={s.dateSeperator}>{" "}|{" "}</span>}
            {newestFile.expirationDate ? <span className={s.date}>Expiration {this.formatDate(newestFile.expirationDate)}</span> : null}
            {!newestFile.expirationDate || !newestFile.effectiveDate ? null : <span className={s.dateSeperator}>{" "}|{" "}</span>}
            {newestFile.effectiveDate ? <span className={s.date}>Effective {this.formatDate(newestFile.effectiveDate)}</span> : null}
            </p>
          <div className={s.office}>By{" "}
            <BasicLink url={data.officeLink.url} text={data.officeLink.title}/>
          </div>
          <hr className={s.hr}/>
          <div className={s.summaryContainer}>
            <Button className={"document-article-pdf-download-btn " + s.downloadButton} onClick={(e) => this.downloadClick(newestFile)} text={"download ."+newestFileExtension}/>
            <p className={"document-article-summary " + s.summary}>{data.summary}</p>
          </div>
          <div className={s.dashContainer}><DecorativeDash className={s.dash}/></div>
          <TextSection className={s.body} text={body}/>
          <div className={"document-article-related-programs-container " + s.relatedProgramsContainer}>
            <hr className={s.hr}/>
            <span className={s.relatedPrograms}>Related programs:{" "}
            </span>

            {data.programs.map((program, index) => {
              return <span className="document-article-related-programs-link" key={index}>
                <a onClick={() => this.handleRelatedPrograms(program)}>{program}</a>{index == data.programs.length - 1
                  ? null
                  : ", "}</span>
            })}
            <hr className={s.hr}/>

          </div>
        </div>
      );
    } else {
      return (
        <div>Document Not Found</div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(NavigationActions, dispatch)};
}


export default connect(null, mapDispatchToProps)(
  DocumentArticle
);
