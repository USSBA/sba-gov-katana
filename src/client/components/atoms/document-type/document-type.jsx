import React from 'react'
import s from './document-type.scss'

const DocumentType = props => {
  const numberDiv =
    props.number && typeof props.number === 'string' ? (
      <div className={s.number}>
        <h6>{props.number}</h6>
      </div>
    ) : (
      undefined
    )

  return (
    <div className={props.className}>
      <div className={s.type}>
        <h6>{props.type ? props.type.toUpperCase() : null}</h6>
      </div>
      {numberDiv}
    </div>
  )
}

DocumentType.defaultProps = {
  type: 'Memo'
}

export default DocumentType
