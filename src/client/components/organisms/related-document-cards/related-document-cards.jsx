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
				<div className={"related-document-section"} key={index}>
					<h2 className={s.sectionTitle}>
						Related {documentType}{" "}
					</h2>
					<a className={s.browseAll} onClick={() => alert("what does this do")}>
						Browse all
					</a>
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
				{this.state.sortedDocuments ? this.renderRelatedDocumentSections() : <div>loading</div>}
			</div>
		);
	}
}

export default RelatedDocumentCards;
