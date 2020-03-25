import React, { Component } from 'react'
import Event from '../../templates/event/event.jsx'
import EventFromD7 from '../../templates/eventD7/event.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import { Loader } from 'atoms'
import { isEmpty } from 'lodash'
import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './event-page.scss'
import clientConfig from '../../../services/client-config.js'

class EventPage extends Component {
  constructor() {
    super()
    this.state = {
      LOADING_STATE: 'unloaded'
    }
  }

  async componentDidMount() {
    const queryArgs = {
      id: String(this.props.params.eventId)
    }
    const results = await fetchSiteContent('events', queryArgs).catch(_ => {
      this.setState({ data: null })
    })
    // TODO: remove feature flag after updating events backend
    const result = clientConfig.useD8EventsBackend ? results.hit : results.items
    const data = !isEmpty(result) ? result[0] : null
    this.setState({ data, LOADING_STATE: 'loaded' })
  }

  render() {
    const { eventId } = this.props.params
    const { data, LOADING_STATE } = this.state

    const eventComponent = clientConfig.useD8EventsBackend ? (
      <Event eventData={data} />
    ) : (
      <EventFromD7 eventData={data} />
    )

    return (
      <div>
        {!eventId && <ErrorPage linkUrl="/events/find" linkMessage="find events page" />}
        {eventId && (
          <div>
            {LOADING_STATE !== 'loaded' && (
              <div className={styles.container}>
                <Loader />
              </div>
            )}
            {LOADING_STATE === 'loaded' && (
              <div>
                {isEmpty(data) && <ErrorPage linkUrl="/events/find" linkMessage="find events page" />}
                {!isEmpty(data) && eventComponent}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default EventPage
