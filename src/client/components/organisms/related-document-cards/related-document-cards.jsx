import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {DocumentCardCollection} from "organisms";
import * as NavigationActions from "../../../actions/navigation.js";
import queryString from "querystring";
import {logPageEvent} from "../../../services/analytics";
import s from "./related-document-cards.scss";

class RelatedDocumentCards extends React.Component {
  constructor() {
    super();
    this.state = {
      sortedDocuments: null
    };
  }

  componentWillMount() {
    this.sortRelatedDocuments();
  }

  sortRelatedDocuments() {
    let relatedDocuments = this.props.data.relatedDocuments;
    if(relatedDocuments){
      let sortedAndFilteredDocuments = {};
      _.uniq(
        relatedDocuments.map(relatedDocument => {
          return relatedDocument.documentIdType;
        })
      ).map(docType => {
        let filteredDocuments = _.filter(relatedDocuments, ["documentIdType", docType]);
        let sortedDocuments = filteredDocuments.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase()
        })
        sortedAndFilteredDocuments[docType] = sortedDocuments
      });
      this.setState({ sortedDocuments: sortedAndFilteredDocuments });
    }
  }

  handleBrowseAll(documentType){
    logPageEvent({category: "Browse-all", action: documentType});
    let params = {type: documentType}
    this.props.actions.locationChange("/document/?" + queryString.stringify(params))
  }

  renderRelatedDocumentSections() {
    let sortedDouments = this.state.sortedDocuments;
    return _.keys(this.state.sortedDocuments).sort().map((documentType, index) => {
      let documents = sortedDouments[documentType];
      return (
        <div className={"related-document-section"} key={index}>
          <div className={"related-document-section-header " + s.sectionHeader}>
            <h3 className={s.sectionTitle}>
              {documentType}{" "}
            </h3>
            <a className={s.browseAll} onClick={() => this.handleBrowseAll(documentType)}>
              Browse all
            </a>
          </div>
          <div>
            <DocumentCardCollection showDetails={false} cards={documents} type={documentType} />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {!_.isEmpty(this.state.sortedDocuments) ? <div><h2 className={s.title}>Related documents</h2>{this.renderRelatedDocumentSections()}</div> : <div></div>}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(NavigationActions, dispatch)};
}
export default connect(null, mapDispatchToProps)(
  RelatedDocumentCards
);
