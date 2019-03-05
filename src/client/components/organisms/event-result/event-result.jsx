import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './event-result.scss'
import { Button, Link } from 'atoms'

class EventResult extends React.PureComponent {
  formatDate() {
    const {
      item: { startDate }
    } = this.props
    return moment.parseZone(startDate).format('dddd, MMMM D')
  }

  formatTime() {
    const {
      item: { startDate: startTime, endDate: endTime, timezone }
    } = this.props
    const startingTimeSuffix = moment.parseZone(startTime).format('a')
    let startingTime
    let endingTime

    if (moment.parseZone(startTime).format('mm') === '00') {
      startingTime = moment.parseZone(startTime).format('h')
    } else {
      startingTime = moment.parseZone(startTime).format('h:mm')
    }

    if (moment.parseZone(endTime).format('mm') === '00') {
      endingTime = moment.parseZone(endTime).format('h a')
    } else {
      endingTime = moment.parseZone(endTime).format('h:mm a')
    }

    // don't include the starting time stuffix when starting and ending suffix match
    if (moment.parseZone(startTime).format('a') === moment.parseZone(endTime).format('a')) {
      return `${startingTime}–${endingTime} ${timezone}`
    } else {
      return `${startingTime} ${startingTimeSuffix}–${endingTime} ${timezone}`
    }
  }

  renderLocationInfo() {
    const {
      item: { locationType, location }
    } = this.props
    if (locationType === 'Online') {
      return 'Online event'
    } else if (location && location.city && location.state) {
      return `${location.city}, ${location.state}`
    }
  }

  renderEventDetailUrl() {
    const { id } = this.props.item
    return `/event/${id}`
  }

  renderRegistrationInfo() {
    const { item } = this.props
    if (item.registrationUrl !== null) {
      return (
        <Button className="register-button" secondary onClick={() => window.open(item.registrationUrl)}>
          REGISTER
        </Button>
      )
    } else {
      return <div className={styles.openEventText}>Open event</div>
    }
  }

  render() {
    const { id, item } = this.props

    // TODO: move this guard clause to the content api
    // Require title, cost, startDate, endDate, timezone to exist in order to render the event
    if (item.title && item.cost && item.startDate && item.endDate && item.timezone && item.locationType) {
      const itemCost = item.cost === '0.00' ? 'Free' : '$' + item.cost

      return (
        <div id={`event-result-${id}`} className={styles.container} data-cy="event result">
          <div className={styles.columnGroupA}>
            <div className={styles.column1}>
              <div className={'event-date ' + styles.date} data-cy="date">
                {this.formatDate()}
              </div>
              <div className="event-time" data-cy="time">
                {this.formatTime()}
              </div>
            </div>
            <div className={styles.column2}>
              <Link
                onClick={() => {
                  window.open(this.renderEventDetailUrl())
                }}
                className={styles.title}
              >
                <h6 className="event-title" data-cy="title">
                  {item.title}
                </h6>
              </Link>
              <div className="event-location" data-cy="location">
                {this.renderLocationInfo()}
              </div>
            </div>
          </div>
          <div className={styles.column3}>
            <div className="event-cost" data-cy="cost">{`${itemCost}`}</div>
          </div>
          <div className={'event-registration ' + styles.column4} data-cy="registration">
            {this.renderRegistrationInfo()}
          </div>
        </div>
      )
    }
  }
}

EventResult.defaultProps = {
  id: 'result'
}

EventResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string
}

export default EventResult
