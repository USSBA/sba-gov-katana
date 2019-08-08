import React from 'react'

class DistrictOfficeTemplate extends React.Component {
  render() {
    const { office } = this.props
    return <p>{office.title}</p>
  }
}

export default DistrictOfficeTemplate
