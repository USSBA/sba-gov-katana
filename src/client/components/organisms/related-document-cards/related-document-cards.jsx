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
		console.log("sortedDouments", sortedDouments);
		return _.keys(this.state.sortedDocuments).map((documentType, index) => {
			let documents = sortedDouments[documentType];
			return (
				<div className={"related-document-section"} key={index}>
					<div className={"related-document-section-header " + s.sectionHeader}>
						<h3 className={s.sectionTitle}>
							Related {documentType}{" "}
						</h3>
						<a className={s.browseAll} onClick={() => alert("what does this do")}>
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
				<h2 className={s.sectionTitle}>Related Documents:</h2>
				{this.state.sortedDocuments ? this.renderRelatedDocumentSections() : <div>loading</div>}
			</div>
		);
	}
}

export default RelatedDocumentCards;
