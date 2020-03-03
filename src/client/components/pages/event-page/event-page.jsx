import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Event from '../../templates/event/event.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import { Loader } from 'atoms'
import { isEmpty } from 'lodash'
import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './event-page.scss'

class EventPage extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    const queryArgs = {
      id: String(this.props.params.eventId)
    }
    const { hit } = await fetchSiteContent('events', queryArgs).catch(_ => this.setState({ data: null }))
    if (hit && hit[0]) {
      this.setState({ data: hit[0] })
    }
  }

  render() {
    const { eventId } = this.props.params
    const { data } = this.state
    if (eventId && data) {
      if (!isEmpty(data)) {
        return (
          <div>
            <Event eventData={data} />
          </div>
        )
      } else {
        return <ErrorPage linkUrl="/events/find" linkMessage="find events page" />
      }
    } else {
      return (
        <div className={styles.container}>
          <Loader />
        </div>
      )
    }
  }
}

export default EventPage
