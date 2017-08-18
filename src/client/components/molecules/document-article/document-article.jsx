import React from 'react'
import s from './document-article.scss'

import DocumentType from '../../atoms/document-type/document-type.jsx'
import TextSection from '../text-section/text-section.jsx'
import DecorativeDash from '../../atoms/decorative-dash/decorative-dash.jsx'
import Button from '../../atoms/large-primary-button/large-primary-button.jsx'
import moment from 'moment'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as NavigationActions from "../../../actions/navigation.js";
import queryString from "querystring";

export class DocumentArticle extends React.Component {

  getNewestFile() {
    return this.props.data.files
      ? this.props.data.files.reduce((acc, file) => {
        return file.version > acc.version
          ? file
          : acc
      })
      : {};
  }

  downloadClick(newestFile) {
    window.open(newestFile.fileUrl, '_blank')
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
      let documentTypeString = "Memo";
      switch(data.type){
          case "document" : documentTypeString = data.documentIdType; break;
          case "article" : documentTypeString = data.category ? data.category[0] : "UNK";break;
          default: documentTypeString = "UNK"
      }
      return (
        <div className={"document-article " + s.page}>
          <DocumentType type={documentTypeString} number={data.documentIdNumber}/>
          <h1 className={"document-article-title " + s.title}>{data.title}</h1>
          <p className={s.dates}>
            {data.updated ? <span className={s.date}>Last Updated {moment.unix(data.updated).format('MMM D, YYYY')}</span> : null}
            {!newestFile.expirationDate || !newestFile.effectiveDate ? null : <span className={s.dateSeperator}>{" "}|{" "}</span>}
            {newestFile.expirationDate ? <span className={s.date}>Expiration {this.formatDate(newestFile.expirationDate)}</span> : null}
            {!newestFile.expirationDate || !newestFile.effectiveDate ? null : <span className={s.dateSeperator}>{" "}|{" "}</span>}
            {newestFile.effectiveDate ? <span className={s.date}>Effective {this.formatDate(newestFile.effectiveDate)}</span> : null}
            </p>
          <div className={s.office}>By{" "}
            <a href={data.officeLink.url}>{data.officeLink.title}</a>
          </div>
          <hr className={s.hr}/>
          <div className={s.summaryContainer}>
            <Button className={"document-article-pdf-download-btn " + s.downloadButton} onClick={(e) => this.downloadClick(newestFile)} text="download pdf"/>
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
