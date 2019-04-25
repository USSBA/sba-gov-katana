import React, { Component, PropTypes } from 'react'
import Event from '../../templates/event/event.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import { Loader } from 'atoms'
import { isEmpty } from 'lodash'
import { fetchEventContent } from '../../../fetch-content-helper'
import styles from './event-page.scss'

class EventPage extends Component {
  constructor() {
    super()
    this.state = {}
  }

  fetchEvent(id) {
    if (id) {
      fetchEventContent(id)
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

    // Re-render the page with new event data when we remain on `/event`
    // and the EventPage but the id has changed.
    if (id !== nextId) {
      return this.fetchEvent(nextId)
    }
  }

  render() {
    const { id } = this.props
    const { data } = this.state

    if (id && data) {
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

EventPage.defaultProps = {
  id: null
}

EventPage.propTypes = {
  id: PropTypes.string
}

export default EventPage
