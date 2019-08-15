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
		console.log('A--', events)
		this.setState({ events })
	}

	render() {
		const { events } = this.state
		const { office } = this.props
		return (
			<div>
				<p>{office.title}</p>
				<div data-testid="events" className={styles.container}>
					<div className={styles.events}>
						<h2>Upcoming events and workshops</h2>
						{ events.length > 0 && <Results items={events}><EventResult /></Results>}
						<div className={styles.button} data-testid="events-button">
							<a href="/events/">
								<Button primary>Find More Events</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default DistrictOfficeTemplate
