import React from "react";
import moment from "moment";
import {
  isObject,
  isEmpty
} from "lodash";

import styles from "./versions-list.scss";
import { logPageEvent } from "../../../services/analytics.js";

const VersionsList = props => {
  const { doc } = props;
  const { documentIdNumber, documentIdType, files, title } = doc;

  if (files.length <= 1) return null;

  const list = files.map((file, index) => {
    const { effectiveDate, fileUrl, version } = file;

    const versionMessage = (
        documentIdType === "SOP"
        && documentIdNumber
        && (!isObject(documentIdNumber) || !isEmpty(documentIdNumber)
      )
      ? documentIdNumber
      : "Version") + " " + (version ? version : "N/A");

    const effectiveDateMessage = `Effective: ${effectiveDate || 'N/A'}`;
    const effectiveDateInTheFuture = moment(effectiveDate).isAfter(moment())
    const eventConfig = {
      category: 'Document-Version',
      action: `docname - ${title}: previous version #${version || 'N/A'}`
    };

    return (
      <li key={index}>
        <strong>{versionMessage}</strong>
        <strong>|</strong>
        {effectiveDateMessage}.
        <a
          href={fileUrl}
          onClick={_ => logPageEvent(eventConfig)}
          target="_blank"
        >
          Download PDF<i
            className="fa fa-file-pdf-o"
            aria-hidden="true"
          />
        </a>
        {effectiveDateInTheFuture
          ? <strong
            className={styles.future}
            key={30}>Future Document
          </strong>
          : null
        }
      </li>
    );
  });

  return (
    <div className={styles.allVersionsList}>
      <h3>All versions</h3>
      <ul>
        {list}
      </ul>
      <hr className={styles.hr}/>
    </div>
  );
};

export default VersionsList;
