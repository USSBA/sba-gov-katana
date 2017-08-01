import React from 'react';
import {
    DecorativeDash,
    PdfIcon
}
from "../../atoms";
import s from "./document-card.scss";

class DocumentCard extends React.Component {
    render() {
        const id = this.props.documents[0].number;

        const ActivityRow = this.props.activitys ?
            (<div className={s.row}> 
                    <div className={s.columnOne}>Activity:</div>
                    <div className={s.columnTwo}>{this.props.activitys.join(", ")}</div>
                </div>) :
            undefined;

        return (
            <div className={s.container}>
            <div className={s.typeAndId}>
                <div className={s.type}>{this.props.type}</div>
                <div className={s.id}>{id}</div>
            </div>
            <div>
            <h6 className={s.title}>
                {this.props.title}
            </h6>
            </div>
            <div className={s.dash}><DecorativeDash/></div>
            <div  className={s.details}>
                <div className={s.row}> 
                    <div className={s.columnOne}>Program:</div>
                    <div className={s.columnTwo}>{this.props.programs.join(", ")}</div>
                </div>
                {ActivityRow}
                <div className={s.row}> 
                    <div className={s.columnOne}>Summary:</div>
                    <div className={s.columnTwo}>{this.props.summary}</div>
                </div>
            </div>
            <div className={s.download}><a className={s.link}>Download PDF</a><PdfIcon/></div>
        </div>
        );
    }
}


DocumentCard.defaultProps = {
    "type": "MyType",
    "summary": "Document Summary",
    "title": "Document Title ABC",
    "programs": [
        "Program 1",
        "Program 2"
    ],
    "documents": [{
        "idType": "Authorization",
        "number": "00 01 A",
        "type": "documentId"
    }],
    "activitys": [
        "Activity 1",
        "Activity 2"
    ]
};

DocumentCard.propTypes = {

};

export default DocumentCard;
