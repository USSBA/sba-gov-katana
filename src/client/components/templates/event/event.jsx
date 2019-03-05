import React, { Component, PropTypes } from 'react'
import { DecorativeDash } from 'atoms'
import classNames from 'classnames'
import styles from './event.scss'

class Event extends Component {
  render() {
    const { title, description } = this.props.eventData

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
        <div className={styles.description}>
          <DecorativeDash aria-hidden="true" width={80} />
          <h4 className={styles.descriptionLabel} data-cy="event-escription-label">
            Description
          </h4>
          <p data-cy="event-description">{description}</p>
        </div>
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
