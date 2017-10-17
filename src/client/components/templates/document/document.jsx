import React from "react";
import {DocumentArticle} from "molecules";
import {RelatedDocumentCards} from "organisms";
import s from "./document.scss";
import {logPageEvent} from "../../../services/analytics.js";
import moment from "moment";
import _ from "lodash"

class DocumentPage extends React.Component {

  render() {
    // Use doc instead of document to avoid potential conflicts.
    const {
      document: doc
    } = this.props;
    if (doc) {
      const allVersionsList = doc.files.map((file, index) => {
        const { effectiveDate, fileUrl, version } = file;
        console.log("documentIdNumber", doc.documentIdNumber)
        console.log("isEmpty", _.isEmpty(doc.documentIdNumber))
        const versionMessage = (doc.documentIdNumber && (!_.isObject(doc.documentIdNumber) || !_.isEmpty(doc.documentIdNumber)) ? doc.documentIdNumber : "Version") + " " +(version ? version : "N/A");
        const effectiveDateMessage = `Effective: ${effectiveDate || 'N/A'}`;
        const effectiveDateInTheFuture = moment(effectiveDate).isAfter(moment())
        const eventConfig = {
          category: 'Document-Version',
          action: `docname - ${doc.title}: previous version #${version || 'N/A'}`
        };

        return (
          <li key={index}>
            <strong>{versionMessage}</strong>
            <strong>|</strong>
            {effectiveDateMessage}.
            <a href={fileUrl} onClick={() => {logPageEvent(eventConfig)}} target="_blank">Download PDF
              <i className="fa fa-file-pdf-o" aria-hidden="true"/>
            </a>
            {effectiveDateInTheFuture ?   <strong className={s.future} key={30}>Future Document</strong> : undefined}
          </li>
        );
      });

      return (
        <div>
          <DocumentArticle data={doc} type="document"/>
          <div className={s.allVersionsList}>
            <h3>All versions</h3>
            <ul>
              {allVersionsList}
            </ul>
            <hr className={s.hr}/>
          </div>
          <RelatedDocumentCards data={doc}/>

        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default DocumentPage;
