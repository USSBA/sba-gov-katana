import React from 'react'
import PropTypes from 'prop-types'
import styles from './event-result.scss'

class EventResult extends React.PureComponent {
  render() {
    const { id, item } = this.props

    return (
      <div id={`event-result-container-${id}`} data-cy="event result">
        <div id={`event-result-${id}`}>
          <div>
            <div id={`event-title-${id}`}>
              <h6 className={styles.title}>{item.title}</h6>
            </div>
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
