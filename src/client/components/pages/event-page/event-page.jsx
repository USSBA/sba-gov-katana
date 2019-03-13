import React, { Component, PropTypes } from 'react'
import Event from '../../templates/event/event.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import { Loader } from 'atoms'
import { fetchRestContent } from '../../../fetch-content-helper'
import styles from './event-page.scss'

class EventPage extends Component {
  constructor() {
    super()
    this.state = {}
  }

  fetchEvent(id) {
    if (id) {
      fetchRestContent('event', id)
        .then(data => this.setState({ data }))
        .catch(_ => this.setState({ data: null }))
    }
  }

  componentDidMount() {
    if (this.props.id) {
      return this.fetchEvent(this.props.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props
    const { id: nextId } = nextProps

    // Re-render the page with new document data when we remain on `/documents`
    // and the DocumentPage but the location has changed.
    if (id !== nextId) {
      return this.fetchEvent(nextId)
    }
  }

  render() {
    const { id } = this.props
    const { data } = this.state

    if (id && data) {
      if (data.title) {
        return (
          <div>
            <Event eventData={data} />
          </div>
        )
      } else {
        // return <ErrorPage type="event" />
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

EventPage.defaultProps = {
  id: null
}

EventPage.propTypes = {
  id: PropTypes.string
}

export default EventPage
