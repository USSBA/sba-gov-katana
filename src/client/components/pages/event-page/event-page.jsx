import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Event from '../../templates/event/event.jsx'
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
    let result
    const results = await fetchSiteContent('events', queryArgs).catch( _ => {
      this.setState({ data: null })
    })
    // TODO: remove feature flag after updating events backend
    result = clientConfig.useD8EventsBackend ? results.hit : results.items
    const data = !isEmpty(result) ? result[0] : null
    this.setState({ data, LOADING_STATE: 'loaded' })
  }

  render() {
    const { eventId } = this.props.params
    const { data, LOADING_STATE } = this.state

    return (
      <div>
        {!eventId && <ErrorPage linkUrl="/events/find" linkMessage="find events page" />}
        {eventId && LOADING_STATE === 'loaded' && (!isEmpty(data) ? <div><Event eventData={data} /></div> : <ErrorPage linkUrl="/events/find" linkMessage="find events page" />)}
        {eventId && LOADING_STATE !== 'loaded' && <div className={styles.container}><Loader /></div>}
      </div>
    )
  }
}

export default EventPage
