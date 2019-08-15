import React from 'react'
import styles from './district-office.scss'
import { Button } from 'atoms'
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
		const { office } = this.props
		const { items } = await fetchSiteContent('events', {
			pageSize: 5,
			officeId: office.id
		})
		// when the events content api is set to D8, then pageSize=5 will do the work for us
		// but since the events content api is set to D7, slice the first 5 items off the response
		const events = items.slice(0, 5)
		this.setState({ events })
	}

	render() {
		const { events } = this.state
		const { office } = this.props
		return (
			<div>
				<p>{office.title}</p>
				<Events items={events} />
			</div>
		)
	}
}

const Events = ({ items }) => {
	return (
		<div data-testid="events" className={styles.container}>
			<div className={styles.events}>
				<h2>Upcoming events and workshops</h2>
				{ items.length > 0 && <Results items={items}><EventResult /></Results>}
				<div className={styles.button} data-testid="events-button">
					<a href="/events/">
						<Button primary>Find More Events</Button>
					</a>
				</div>
			</div>
		</div>
	)
}

export default DistrictOfficeTemplate
