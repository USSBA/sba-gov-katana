import React from "react";
import s from "./related-document-cards.scss";
import _ from "lodash";

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
		let sortedDoumentsObj = this.state.sortedDocuments
		return _.keys(this.state.sortedDocuments).map((documentType) => {
			return <RelatedDocumentSection documentType={documentType} documentArr={sortedDoumentsObj[documentType]}/>
		})
	}

	render() {
		return (
			<div>
				{this.state.sortedDocuments
					? this.renderRelatedDocumentSections()
					: <div>loading</div>}
				<div>sfsdf</div>
			</div>
		);
	}
}

class RelatedDocumentSection extends React.Component {
	render() {
		console.log(this.props.documentArr)
		return <div>RelatedDocuments component</div>;
	}
}

export default RelatedDocumentCards;
