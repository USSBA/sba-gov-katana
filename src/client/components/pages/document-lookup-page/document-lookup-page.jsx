import React from "react";
import {PagingLookup} from "molecules";
import style from "./document-lookup-page.scss";

class DocumentLookupPage extends React.Component {

  render() {
    let documentProps = {
      title: "Documentation Lookup",
      type: "documents",
      taxonomyFilters: [
        "documentType", "program", "documentActivity"
      ],
      fieldsToShowInDetails: ["Activity", "Program", "Summary"],
      sortByOptions: ["Last Updated", "Title", "Number", "Effective Date"]
    };
    return (<PagingLookup {...documentProps}/>);
  }

}

export default DocumentLookupPage;
