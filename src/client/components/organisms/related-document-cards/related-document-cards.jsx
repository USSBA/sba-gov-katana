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
			sortedDocuments[docType] = _.filter(relatedDocuments, [
				"documentIdType",
				docType
			]);
		});
		this.setState({ sortedDocuments: sortedDocuments });
	}

	renderRelatedDocumentSections() {
		let sortedDouments = this.state.sortedDocuments;
		return _.keys(this.state.sortedDocuments).map((documentType, index) => {
			return (
				<RelatedDocumentSection
					key={index}
					documentType={documentType}
					documents={sortedDouments[documentType]}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				{this.state.sortedDocuments
					? this.renderRelatedDocumentSections()
					: <div>loading</div>}
			</div>
		);
	}
}

class RelatedDocumentSection extends React.Component {
	render() {
		return (
			<div>
				<h2 className={s.sectionTitle}>
					{this.props.documentType}
				</h2>
				<div>
					<DocumentCardCollection
						documentLookup={false}
						documents={this.props.documents}
					/>
				</div>
			</div>
		);
	}
}

export default RelatedDocumentCards;
