import React from 'react'
import s from './document-type.scss'

const DocumentType = (props) => {
	return(
		<div className={props.className}>
			<div className={s.type}>{props.type}</div>
			<div className={s.number}>{props.number}</div>
		</div>
	)
}

export default DocumentType 