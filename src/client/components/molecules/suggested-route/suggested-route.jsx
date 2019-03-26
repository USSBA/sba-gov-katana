import React, { PureComponent, PropTypes } from 'React'
import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './suggested-route.scss'

class SuggestedRoute extends PureComponent {
	constructor() {
		super()
		this.state = {
			title: 'Title',
			description: 'this is the description.',
			url: '#'
		}
	}
	componentWillMount() {
		const terms = this.props.searchTerm.split(' ')
		fetchSiteContent('suggestedRoutes').then( results => {
			let keywords = []
			for (let i = 0; i < results.length; i++) {
				for (let j = 0; j < results[i].keywords.length; j++) {
					keywords.push(results[i].keywords[j])
				}
			}
			for (let term of terms) {
				if (keywords.includes(term)) {
					const {
						title,
						description,
						url
					} = results.find( route => route.keywords.includes(term))
					this.setState({
						title,
						description,
						url
					})
					break;
				}
			}
		})
	}
	render() {
		const { title, description, url } = this.state
		return (
			<div data-cy="suggested route">
				<div>{title}</div>
				<div>{description}</div>
				<div>{url}</div>
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
