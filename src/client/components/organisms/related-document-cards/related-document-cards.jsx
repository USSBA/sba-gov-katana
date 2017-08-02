import React from "react";
import s from "./related-document-cards.scss";
import _ from "lodash";
import DocumentCardCollection from "../document-card-collection/document-card-collection.jsx";

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
		let sortedDocuments = {};
		_.uniq(
			relatedDocuments.map(relatedDocument => {
				return relatedDocument.documentIdType;
			})
		).map(docType => {
			sortedDocuments[docType] = _.filter(relatedDocuments, ["documentIdType", docType]);
		});
		this.setState({ sortedDocuments: sortedDocuments });
	}

	renderRelatedDocumentSections() {
		let sortedDouments = this.state.sortedDocuments;
		return _.keys(this.state.sortedDocuments).map((documentType, index) => {
			let documents = sortedDouments[documentType];
			return (
				<div>
					<h2 className={s.sectionTitle}>
						{documentType}
					</h2>
					<div>
						<DocumentCardCollection documentLookup={false} documents={documents} />
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				{this.state.sortedDocuments ? this.renderRelatedDocumentSections() : <div>loading</div>}
			</div>
		);
	}
}

export default RelatedDocumentCards;



