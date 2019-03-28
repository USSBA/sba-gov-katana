import React, { PureComponent, PropTypes } from 'react'
import { Button } from 'atoms'
import styles from './suggested-route-card.scss'
import { isEmpty } from 'lodash'
import { fetchSiteContent } from '../../../fetch-content-helper'

class SuggestedRouteCard extends PureComponent {
	constructor() {
		super()
		this.state = {
			route: '',
			cardMessage: '',
			buttonLabel: ''
		}
	}
	getRouteBySearchTerm(searchTerm, routes) {
		// collect all keywords from each route
		let keywords = []
		for (let i = 0; i < routes.length; i++) {
			for (let j = 0; j < routes[i].keywords.length; j++) {
				keywords.push(routes[i].keywords[j])
			}
		}
		// if a term is found in the keywords collection
			// return the keyword's associated route
		let result
		const terms = searchTerm.split(' ')
		for (let term of terms) {
			if (keywords.includes(term)) {
				result = routes.find( route => route.keywords.includes(term))
				break;
			}
		}
		return result;
	}
	componentWillMount() {
		const { searchTerm } = this.props
		fetchSiteContent('suggestedRoutes').then( results => {
			const result = this.getRouteBySearchTerm(searchTerm, results)
			if (!isEmpty(result)) {
				const {
					route,
					cardMessage,
					buttonLabel
				} = result
				this.setState({
					route,
					cardMessage,
					buttonLabel
				})
			}
		})
	}
	render() {
		const { route, cardMessage, buttonLabel } = this.state
		return (
			<div>
				{!isEmpty(route) &&
				<div id="suggested-route" className={styles.container} data-cy="suggested route" tabIndex="0">
					<div className={styles.columnA}>
						<div>
							<h3 data-cy="card message" tabIndex="0">{cardMessage}</h3>
						</div>
					</div>
					<div className={styles.columnB}>
						<Button primary url={route} data-cy="button">
							{buttonLabel}
						</Button>
					</div>
					<div className={styles.clear} />
				</div>}
			</div>
		)
	}
}

SuggestedRouteCard.propTypes = {
	searchTerm: PropTypes.string
}
SuggestedRouteCard.defaultProps = {
	searchTerm: ''
}

export default SuggestedRouteCard
