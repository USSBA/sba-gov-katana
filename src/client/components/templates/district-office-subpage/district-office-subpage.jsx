import React, { Component } from 'react'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper.js'
import { isEmpty } from 'lodash'

class DistrictOfficeSubpage extends Component {

	constructor() {
	    super()
	    this.state = {
	      data: {},
	      loadingState: 'unloaded'
	    }
	}

	async componentDidMount() {
	    const { subPageId } = this.props.params

	    if (subPageId) {
	      this.setState(
	        {
	          loadingState: 'isLoading'
	        },
	        async () => {
	          const data = await fetchRestContent(subPageId)
	          this.setState({ data, loadingState: 'isLoaded' })
	        }
	      )
	    }
	}

	render() {
		const { data, loadingState } = this.state

		return (
			<div>
				{loadingState === 'isLoading' && <div>loading...</div>}
				{loadingState === 'isLoaded' && (
		          <div>
		            {!isEmpty(data) ? (
		              <div>{JSON.stringify(data)}</div>
		            ) : (
		              <div>No Data Found</div>
		            )}
		          </div>
		        )}
			</div>
		)
	}
}

export default DistrictOfficeSubpage
