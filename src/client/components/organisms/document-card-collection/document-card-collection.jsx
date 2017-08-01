import React from "react"
import s from "./document-card-collection.scss";
import _ from "lodash";
import DocumentCard from "../../molecules/document-card/document-card.jsx";


class DocumentCardCollection extends React.Component {

    constructor() {
        super();
        this.state = {}
    }
    render() {
        return this.props.documents.map((document) => {
            return (<DocumentCard/>);
        });
    }
}

DocumentCardCollection.propTypes = {
    documents: React.PropTypes.array
};

DocumentCardCollection.defaultProps = {
    documents: ["test"]
};
export default DocumentCardCollection;
