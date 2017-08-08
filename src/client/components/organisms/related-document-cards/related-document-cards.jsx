import React from "react";
import s from "./related-document-cards.scss";
import _ from "lodash";
import DocumentCardCollection from "../document-card-collection/document-card-collection.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as NavigationActions from "../../../actions/navigation.js";
import queryString from "querystring";

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
		let relatedDocuments = this.props.documentObj.relatedDocuments;
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

	handleBrowseAll(documentType){
		let params = {type: documentType}
		this.props.actions.locationChange("/document/?" + queryString.stringify(params))
	}

	renderRelatedDocumentSections() {
		let sortedDouments = this.state.sortedDocuments;
		console.log("sortedDouments", sortedDouments);
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
						<DocumentCardCollection showDetails={false} documents={documents} />
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				{this.state.sortedDocuments ? <div><h2 className={s.title}>Related Documents:</h2>{this.renderRelatedDocumentSections()}</div> : <div>loading</div>}
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
