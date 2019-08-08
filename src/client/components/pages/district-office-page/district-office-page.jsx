import React from 'react'
import { isEmpty } from 'lodash'
import DistrictOffice from '../../templates/district-office/district-office.jsx'
import { Loader } from 'atoms'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper.js'
import ErrorPage from '../error-page/error-page.jsx'

class DistrictOfficePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      office: {}
    }
  }

  async componentDidMount() {
    await this.fetchOfficeInfo(this.props.params.officeId)
  }

  validOffice(office) {
    let valid = false
    if (office !== null) {
      if (office.officeType !== null && office.officeType === 'SBA District Office') {
        valid = true
      }
    }
    return valid
  }

  render() {
    const { officeId } = this.props.params
    const { office } = this.state

    if (officeId && office) {
      if (this.validOffice(office)) {
        return (
          <div>
            <DistrictOffice office={office} />
          </div>
        )
      } else {
        return (
          <ErrorPage
            linkUrl="/local-assistance/find/?type=SBA District Office"
            linkMessage="find offices page"
          />
        )
      }
    } else {
      return (
        <div>
          <Loader />
        </div>
      )
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
