import React from 'react'
import PropTypes from 'prop-types'

const DatalistDropdown = props => {
  const { id, options, className } = props
  return (
    <datalist className={className} id={id}>
      {options.length &&
        options.map(option => {
          return <option value={option} />
        })}
    </datalist>
  )
}

DatalistDropdown.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
}

export default DatalistDropdown
