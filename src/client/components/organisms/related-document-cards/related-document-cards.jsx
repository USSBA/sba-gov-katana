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
		//https://repl.it/Js5X
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

	renderDocumentCards(){
		console.log(this.state.sortedDocuments)
		return (
			<div>oioioioi</div>
		)
		_.mapKeys(this.state.sortedDocuments, (documentArr, type) => {
			return <div>oioioio</div>	
			documentArr.map((document, index) => {
				console.log(document)
			})
		})
	}

	render() {
		return (
			<div>
				{this.state.sortedDocuments
					? this.renderDocumentCards()
					: <div>loading</div>}
				<div>sfsdf</div>
			</div>
		);
	}
}

export default RelatedDocumentCards;
