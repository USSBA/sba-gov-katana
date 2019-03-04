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

    const descriptionLabelClassName = classNames({
      'description-label': true,
      [styles.descriptionLabel]: true
    })

    const descriptionClassName = classNames({
      description: true,
      [styles.description]: true
    })

    const decorativeDashClassName = classNames({
      decdash: true,
      [styles.dash]: true
    })

    return (
      <div className={containerClassNames}>
        <h1 className={titleClassName} data-cy="event-title">
          {title}
        </h1>
        <div className={decorativeDashClassName}>
          <DecorativeDash aria-hidden="true" width={80} />
        </div>
        <div>
          <h4 className={descriptionLabelClassName} data-cy="eventd-escription-label">
            Description
          </h4>
          <p className={descriptionClassName} data-cy="event-description">
            {description}
          </p>
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
