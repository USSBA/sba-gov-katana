import React from 'react';
import s from './document-type.scss';

const DocumentType = (props) => {
	let numberDiv = props.number && typeof props.number === 'string' ? (<div className={s.number}>{props.number}</div>) : undefined;

	return(
		<div className={props.className}>
			<div className={s.type}>{props.type ? props.type.toUpperCase() : null}</div>
			{numberDiv}
		</div>
	)
}

DocumentType.defaultProps = {
	type: "Memo"
}

export default DocumentType;
