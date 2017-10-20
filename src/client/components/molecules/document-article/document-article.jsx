import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {logPageEvent} from "../../../services/analytics.js";
import moment from "moment";
import queryString from "querystring";
import {
  DocumentType,
  DecorativeDash,
  LargePrimaryButton,
  BasicLink
} from "atoms";
import {TextSection} from "molecules";

import * as NavigationActions from "../../../actions/navigation.js";

import s from "./document-article.scss";

export class DocumentArticle extends React.Component {

  getCurrentFile() {
    let found = null;
    let files = this.props.data.files;
    if (files) {
      found = _.chain(files)
        .filter(item => moment(item.effectiveDate).isSameOrBefore(moment()))
        .sortBy("effectiveDate")
        .last()
        .value();
    } else if (this.props.data.file) {
      found = {
        fileUrl: this.props.data.file
      };
    }
    return found;
  }

  downloadClick(currentFile) {
    if(currentFile && currentFile.fileUrl){
      logPageEvent({category: "Download-PDF-CTA", action: "Click"});
      window.open(currentFile.fileUrl, '_blank')
    }
  }

  formatDate(date) {
    return moment(date).format('MMM D, YYYY')
  }

  handleRelatedPrograms(program){
    logPageEvent({category: "Related-Programs", action: `program${program}`})
    let params = {program: program}
    this.props.actions.locationChange("/"+this.props.type+"/?" + queryString.stringify(params))
  }

  renderDateLine(file) {

    const {effectiveDate} = file;
    const {data} = this.props;

    const dates = [];

    if (effectiveDate) {

      dates.push({
        title: "Effective",
        date: this.formatDate(effectiveDate)
      });

    }

    if (data) {

      dates.push({
        title: "Last Updated",
        date: moment.unix(data.updated).format("MMM D, YYYY")
      });

    }

    const dateLine = dates.map((object, index) => {

      return (<span key={index}>
          {index > 0 && <span className={s.dateSeperator}>{" "}|{" "}</span>}
          <span className={s.date}>{object.title} {object.date}</span>
          </span>
      );

    });

    return ( <p className={s.dates}> {dateLine} </p>);

  }

  render() {
    const data = this.props.data
    const body = data.body && typeof data.body === "string" ? data.body: "";
    if (data) {
      const currentFile = this.getCurrentFile()
      let currentFileExtension = "";
      if(currentFile && currentFile.fileUrl && currentFile.fileUrl.includes && currentFile.fileUrl.includes(".")){
          currentFileExtension = "." + _.last(currentFile.fileUrl.split("."));
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

          {!_.isEmpty(currentFile) && <div>
            {this.renderDateLine(currentFile)}
          </div>}

          {data.officeLink.url ? <div className={s.office}>By{" "}
            <BasicLink url={data.officeLink.url} text={data.officeLink.title}/>
          </div> : <span/>
          }
          <hr className={s.hr}/>
          <div className={s.summaryContainer}>
            <LargePrimaryButton className={"document-article-pdf-download-btn " + s.downloadButton} onClick={(e) => this.downloadClick(currentFile)} disabled={!currentFile || _.isEmpty(currentFile.fileUrl)} text={"download "+currentFileExtension}/>
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
