import React from 'react'
import { isEmpty } from 'lodash'
import DistrictOffice from '../../templates/district-office/district-office.jsx'
import { Loader } from 'atoms'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper.js'
import ErrorPage from '../error-page/error-page.jsx'

const errorUrl = '/local-assistance'
const errorMessage = 'local assistance page'

class DistrictOfficePage extends React.Component {
  constructor() {
    super()
    this.state = {
      office: {},
      loadingState: 'unloaded'
    }
  }

  async componentDidMount() {
    await this.fetchOfficeInfo(this.props.params.officeId)
  }

  render() {
    const { office, loadingState } = this.state

    return (
      <div>
        {loadingState === 'isLoading' && (
          <div data-testid={'office-loader'}>
            <Loader />
          </div>
        )}
        {loadingState === 'isLoaded' && (
          <div>
            {!isEmpty(office) ? (
              <div data-testid={'office-content'}>
                <DistrictOffice office={office} />
              </div>
            ) : (
              <div data-testid={'office-error'}>
                <ErrorPage linkUrl={errorUrl} linkMessage={errorMessage} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  async fetchOfficeInfo(officeId) {
    if (officeId) {
      this.setState(
        {
          loadingState: 'isLoading'
        },
        async () => {
          const office = await fetchRestContent(officeId)
          this.setState({ office, loadingState: 'isLoaded' })
        }
      )
    }
  }
}

export default DistrictOfficePage
