import React from 'react'
import PropTypes from 'prop-types'

const Spacing = props => {
  const { bottom, top } = props

  const style = {
    ...(bottom && { marginBottom: `${bottom}px` }),
    ...(top && { marginTop: `${top}px` })
  }

  return <div style={style} />
}

Spacing.propTypes = {
  bottom: PropTypes.number,
  top: PropTypes.number
}

export default Spacing
