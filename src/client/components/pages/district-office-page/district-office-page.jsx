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
      LOADING_STATE: 'unloaded'
    }
  }

  async componentDidMount() {
    await this.fetchOfficeInfo(this.props.params.officeId)
  }

  async componentWillReceiveProps(nextProps) {
    const { id } = this.props
    const { id: nextId } = nextProps

    // Re-render the page with new blog data when we remain on `/blog`
    // and the BlogPage but the location has changed.
    if (id !== nextId) {
      await this.fetchOfficeInfo(this.props.params.officeId)
    }
  }

  render() {
    const { office, LOADING_STATE } = this.state

    return (
      <div>
        {LOADING_STATE === 'isLoading' && (
          <div data-testid={'office-loader'}>
            <Loader />
          </div>
        )}
        {LOADING_STATE === 'isLoaded' && (
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
          LOADING_STATE: 'isLoading'
        },
        async () => {
          const office = await fetchRestContent(officeId)
          this.setState({ office, LOADING_STATE: 'isLoaded' })
        }
      )
    }
  }
}

export default DistrictOfficePage
