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

  // TODO
  renderEventDetailUrl() {
    return '/events/find'
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
      <div id={`event-result-container-${id}`} className={styles.container} data-cy="event result">
        <div id={`event-result-${id}`} className={styles.result}>
          <div>
            <div className={styles.date}>{this.formatDate(item.startDate)}</div>
            <div>{this.formatTime(item.startDate, item.endDate, item.timezone)}</div>
          </div>
          <div>
            <Link to={this.renderEventDetailUrl()} className={styles.title}>
              <h6 id={`event-title-${id}`}>{item.title}</h6>
            </Link>
            <div id={`event-location-${id}`}>
              {this.renderLocationInfo(item.locationType, item.location.city, item.location.state)}
            </div>
          </div>
          <div>{`${itemCost}`}</div>
          <div>
            <Button secondary>REGISTER</Button>
          </div>
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
