import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import styles from './event.scss'

class Event extends Component {
  render() {
    const { title } = this.props.eventData

    // classNames is not necessary when this is created for future extensibility
    // delete this comment if you modify the classNames below to include logic
    const containerClassNames = classNames({
      event: true,
      [styles.container]: true
    })

    const titleClassName = classNames({
      'event-title': true,
      [styles.title]: true
    })

    return (
      <div className={containerClassNames}>
        <h1 className={titleClassName} data-cy="event-title">
          {title}
        </h1>
        <div>{JSON.stringify(this.props.eventData)}</div>
      </div>
    )
  }
}

Event.defaultProps = {
  eventData: {
    prop: 1
  }
}

Event.propTypes = {
  eventData: PropTypes.object
}

export default Event
