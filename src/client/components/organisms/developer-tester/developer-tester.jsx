import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import {DocumentCard} from "molecules";
import DocumentPage from "../../pages/document-page/document-page.jsx";
import styles from "./developer-tester.scss";


export class DeveloperTester extends React.Component {
  constructor() {
    super();
  }

  render() {
    let myprops = {
      type: "document",
      summary: "Document Summary",
      title: "DocumentTitle",
      programs: ["Authorization", "General"],
      relatedDocuments: [],
      files: [
        {
          type: "docFile",
          effectiveDate: "1867-11-07",
          expirationDate: "1934-07-04",
          fileUrl:
            "http://drupal8.content.hostname/sites/default/files/1898-12/88.txt",
          version: "226"
        },
        {
          type: "docFile",
          effectiveDate: "1970-01-01",
          expirationDate: "2038-01-19",
          fileUrl:
            "http://drupal8.content.hostname/sites/default/files/1970-01/0.txt",
          version: "4"
        }
      ],
      documents: [
        {
          idType: "Authorization",
          number: "17 01 A",
          type: "documentId"
        },
        {
          idType: "General",
          number: "17 01 D",
          type: "documentId"
        }
      ],
      body: "<p>With a body</p>\r\n",
      officeLink: {
        url: "http://office-link.example.com",
        title: "Office Example Test"
      },
      activitys: ["Plan", "Export express"]
    };
    return (
      <div>
        <div className={styles.container}>
          <DocumentCard />
        </div>
        <Divider />
        <DocumentPage />
        <Divider />
      </div>
    );
  }
}

const Divider = (props) => {
  return(
    <div className={styles.divider}> COMPONENT DIVIDER  </div>
  )
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(
  DeveloperTester
);
