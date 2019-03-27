import React, { PureComponent, PropTypes } from 'React'
import styles from './suggested-route.scss'
import { isEmpty } from 'lodash'
import sinon from 'sinon'
import { Button } from 'atoms'
import { fetchSiteContent } from '../../../fetch-content-helper'

class SuggestedRoute extends PureComponent {
	constructor() {
		super()
		this.state = {
			title: '',
			description: '',
			url: ''
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
			const route = this.getRouteBySearchTerm(searchTerm, results)
			if (!isEmpty(route)) {
				this.setState({...route})
			}
		})
	}
	render() {
		const { title, description, url } = this.state
		return (
			<div>
				{!isEmpty(title) &&
				<div id="suggested-route" className={styles.container} data-cy="suggested route" tabIndex="0">
					<div className={styles.columnA}>
						<div>{title}</div>
						<div>{description}</div>
						<div>{url}</div>
					</div>
					<div className={styles.columnB}>
						<Button primary>
							{title}
						</Button>
					</div>
					<div className={styles.clear} />
				</div>}
			</div>
		)
	}
}

SuggestedRoute.propTypes = {
	searchTerm: PropTypes.string
}
SuggestedRoute.defaultProps = {
	searchTerm: ''
}

export default SuggestedRoute
