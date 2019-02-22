import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './event-result.scss'

class EventResult extends React.PureComponent {
  formatDate(date) {
    return moment(date).format('dddd, MMMM D')
  }

  render() {
    const { id, item } = this.props

    let itemCost
    if (item.cost === '0.00') {
      itemCost = 'Free'
    } else {
      itemCost = item.cost
    }

    return (
      <div id={`event-result-container-${id}`} className={styles.container} data-cy="event result">
        <div id={`event-result-${id}`} className={styles.result}>
          <div>{this.formatDate(item.startDate)}</div>
          <div>
            <h6 id={`event-title-${id}`} className={styles.title}>
              {item.title}
            </h6>
            <div id={`event-location-${id}`}>{`${item.location.city}, ${item.location.state}`}</div>
          </div>
          <div>{`${itemCost}`}</div>
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
