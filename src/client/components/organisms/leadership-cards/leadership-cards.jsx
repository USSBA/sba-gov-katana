import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AuthorCard } from 'molecules'
import styles from './leadership-cards.scss'
import { fetchRestContent } from '../../../fetch-content-helper'

class LeadershipCards extends PureComponent {
	constructor() {
		super()
		this.state = {
		  leaders: []
		}
	}

	async componentDidMount() {
		const { data } = this.props

		let leaders = []
		for (let item in data) {
			leaders.push(await fetchRestContent(data[item].person))
		}

		this.setState({ leaders })
	}
	
	render() {
		const { leaders } = this.state

		const cards = leaders.map(({ name, title, shortBio, url }, index) => {
			return (
			<div data-testid={'leader-card'} key={index} className={styles.threeColumn}>
				<AuthorCard name={name} title={title} shortBio={shortBio} url={url} />
			</div>
			)
		})
		return (
			<div className={styles.leadership}>
				<h3>Leadership</h3>
				{cards}
				<div className={styles.clear} />
			</div>
		)
	}
}

LeadershipCards.propTypes = {
	"data": PropTypes.array
}

export default LeadershipCards
