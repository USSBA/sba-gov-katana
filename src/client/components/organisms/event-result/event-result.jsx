import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './event-result.scss'
import { Button, Link } from 'atoms'

class EventResult extends React.PureComponent {
  formatDate(date) {
    return moment(date).format('dddd, MMMM D')
  }

  formatTime(startTime, endTime, timezone) {
    const startingTimeSuffix = moment(startTime).format('a')
    let startingTime
    let endingTime

    if (moment(startTime).format('mm') === '00') {
      startingTime = moment(startTime).format('h')
    } else {
      startingTime = moment(startTime).format('h:mm')
    }

    if (moment(endTime).format('mm') === '00') {
      endingTime = moment(endTime).format('h a')
    } else {
      endingTime = moment(endTime).format('h:mm a')
    }

    // don't include the starting time stuffix when starting and ending suffix match
    if (moment(startTime).format('a') === moment(endTime).format('a')) {
      return `${startingTime}–${endingTime} ${timezone}`
    } else {
      return `${startingTime} ${startingTimeSuffix}-${endingTime} ${timezone}`
    }
  }

  renderLocationInfo(locationType, city, state) {
    if (locationType === 'Online') {
      return 'Online event'
    } else {
      return `${city}, ${state}`
    }
  }

  renderEventDetailUrl(id) {
    return `/event/${id}`
  }

  render() {
    const { id, item } = this.props

    let itemCost
    if (item.cost === '0.00') {
      itemCost = 'Free'
    } else {
      itemCost = `$${item.cost}`
    }

    return (
      <div id={`event-result-${id}`} className={styles.container} data-cy="event result">
        <div className={styles.columnGroupA}>
          <div className={styles.column1}>
            <div id={`event-date-${id}`} className={styles.date}>
              {this.formatDate(item.startDate)}
            </div>
            <div id={`event-time-${id}`}>
              {this.formatTime(item.startDate, item.endDate, item.timezone)}
            </div>
          </div>

          <div className={styles.column2}>
            <Link to={this.renderEventDetailUrl(item.id)} className={styles.title}>
              <h6 id={`event-title-${id}`}>{item.title}</h6>
            </Link>
            <div id={`event-location-${id}`}>
              {this.renderLocationInfo(item.locationType, item.location.city, item.location.state)}
            </div>
          </div>
        </div>

        <div className={styles.column3}>
          <div id={`event-cost-${id}`}>{`${itemCost}`}</div>
        </div>

        <div id={`event-registration-${id}`} className={styles.column4}>
          <Button secondary responsive={false}>
            REGISTER
          </Button>
        </div>
      </div>
    )
  }
}

EventResult.defaultProps = {
  id: 'result'
}

EventResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string //.isRequired
}

export default EventResult
