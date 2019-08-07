import React from 'react'
import DistrictOffice from '../../templates/district-office/district-office.jsx'
import { Loader } from 'atoms'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper.js'

class DistrictOfficePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  async componentDidMount() {
    await this.fetchOfficeInfo(this.props.params.officeId)
  }

  render() {
    const { officeId } = this.props.params
    const { office } = this.state

    if (officeId && office !== null) {
      if (office) {
        return <DistrictOffice office={this.state.office} />
      } else {
        return <Loader />
      }
    }
  }

  async fetchOfficeInfo(officeId) {
    if (officeId) {
      try {
        const office = await fetchRestContent(officeId)
        if (office) {
          this.setState({ office })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default DistrictOfficePage
