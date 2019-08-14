import React from 'react'
import styles from './district-office.scss'
import { EventResult, Results } from 'organisms'
import { fetchSiteContent } from '../../../fetch-content-helper'

class DistrictOfficeTemplate extends React.Component {
	constructor() {
		super()
		this.state = {
			events: []
		}
	}

	async componentDidMount() {
		const { items:events } = await fetchSiteContent('events')
		console.log('A--', events)
		this.setState({ events })
	}

	render() {
		const { events } = this.state
		const { office } = this.props
		return (
			<div>
				<p>{office.title}</p>
				{ events.length > 0 && <Events items={events} />}
			</div>
		)
	}
}

const Events = ({ items }) => {
	return (	
		<div data-testid="events" className={styles.container}>
			<div className={styles.events}>
				<h2>Upcoming events and workshops</h2>
				<Results items={items}>
					<EventResult />
				</Results>
			</div>
		</div>
	)
}

export default DistrictOfficeTemplate
