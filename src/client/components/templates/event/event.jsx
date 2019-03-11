import React, { Component, PropTypes } from 'react'
import { Button, DecorativeDash } from 'atoms'
import classNames from 'classnames'
import moment from 'moment'
import { isEmpty } from 'lodash'
import styles from './event.scss'

class Event extends Component {
  render() {
    const { title, description, registrationUrl } = this.props.eventData

    const startDate = moment(this.props.eventData).format('dddd, MMMM D')
    const startDateDetails = moment(this.props.eventData.startDate).format('dddd, MMMM D, YYYY')

    // classNames is not necessary when this is created for future extensibility
    // delete this comment if you modify the classNames below to include logic
    const containerClassNames = classNames({
      event: true,
      [styles.container]: true
    })

    // const titleClassName = classNames({
    //   'event-title': true,
    //   [styles.title]: true
    // })

    const iconClassName = classNames({
      'fa fa-external-link': true,
      [styles.registerButtonIcon]: true
    })

    return (
      <div className={containerClassNames}>
        <div className={styles.header}>
          <h3 id="event-header-date">{startDate}</h3>
          <h1 data-cy="event-title">{title}</h1>
        </div>
        <div className={styles.columnA}>
          <DecorativeDash aria-hidden="true" width={80} />
          <h4 className={styles.descriptionLabel} data-cy="event-description-label">
            Description
          </h4>
          <p id="event-details-description" data-cy="event-description">
            {description}
          </p>
        </div>
        <div className={styles.columnB}>
          {!isEmpty(registrationUrl) && <div className={styles.button} data-cy="registration">
            <Button className="register-button" primary onClick={()=>console.log('Register Button Clicked!')}>
              REGISTER <i aria-hidden="true" className={iconClassName} />
            </Button>
          </div>}
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
