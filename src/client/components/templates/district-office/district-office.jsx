import React from 'react'

class DistrictOfficeTemplate extends React.Component {
  render() {
    const { office } = this.props
    console.log(office)
    return <p>{office.title}</p>
  }
}

export default DistrictOfficeTemplate
