import React from "react";
import {PagingLookup} from "molecules";
import style from "./article-lookup-page.scss";

class ArticleLookupPage extends React.Component {

  render() {
    let articleProps = {
      title: "Article Lookup",
      type: "articles",
      taxonomyFilters: [
        "articleType", "program"
      ],
      fieldsToShowInDetails: ["Program", "Published", "Summary"],
      sortByOptions: ["Last Updated", "Title"]
    };
    return (<PagingLookup {...articleProps}/>);
  }

}

export default ArticleLookupPage;
