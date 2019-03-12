import React, { Component, PropTypes } from 'react'
import { Button, DecorativeDash, SmallIcon  } from 'atoms'
import classNames from 'classnames'
import moment from 'moment'
import { isEmpty } from 'lodash'
import styles from './event.scss'
import { LeaveSbaModal } from 'organisms'
import he from 'he'

class Event extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    }
  }

  handleRegisterButtonClick(e) {
    e.preventDefault()
    this.setModalState(true)
  }

  setModalState(isOpen) {
    this.setState({ modalIsOpen: isOpen })
  }

  handleClose() {
    this.setModalState(false)
  }

  render() {
    const {
      title,
      description,
      timezone,
      recurring,
      recurringType,
      cost,
      location,
      contact,
      registrationUrl
    } = this.props.eventData

    const startDate = moment.parseZone(this.props.eventData.startDate).format('dddd, MMMM D')
    const startDateDetails = moment.parseZone(this.props.eventData.startDate).format('dddd, MMMM D, YYYY')
    const startTime = moment.parseZone(this.props.eventData.startDate).format('h')
    const endTime = moment.parseZone(this.props.eventData.endDate).format('h a')
    const eventTime = `${startTime}-${endTime}, ${timezone}`

    let recurringDetail
    if (recurring === 'Yes') {
      switch (recurringType) {
        case 'Recurs monthly (same week &amp; same day of week)':
          recurringDetail = 'Reoccurs same day every month'
          break
        case 'Recurs bi-weekly':
          recurringDetail = 'Reoccurs bi-weekly'
          break
        case 'Recurs weekly':
          recurringDetail = 'Reoccurs weekly'
          break
        case 'Recurs daily':
          recurringDetail = 'Reoccurs daily'
          break
        default:
          recurringDetail = 'This is a reoccuring event'
          break
      }
    }

    const costDetail = cost === '0.00' ? 'Free' : '$' + cost

    const address =
      location.address && location.city && location.state && location.zipcode
        ? location.address + '\n' + location.city + ',' + location.state + ' ' + location.zipcode
        : null

    const link = 'https://maps.google.com?q=' + encodeURIComponent(address)

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

    const eventTitle = he.decode(title)

    return (
      <div className={containerClassNames}>
        <div className={styles.header}>
          <h3 id="event-header-date">{startDate}</h3>
          <h1 data-cy="event-title">{eventTitle}</h1>
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
            <Button className="register-button" primary onClick={this.handleRegisterButtonClick.bind(this)}>
              REGISTER <i aria-hidden="true" className={iconClassName} />
            </Button>
            <LeaveSbaModal
              closeLeaveSba={this.handleClose.bind(this)}
              isOpen={this.state.modalIsOpen}
              url={registrationUrl}
              shouldOpenNewWindow
              data-cy="leave sba modal"
            />
          </div>}
          <div className={styles.callout}>
            <h3>Date and time</h3>
            <div>
              <div id="event-details-date">{startDateDetails}</div>
              <div id="event-details-time">{eventTime}</div>
              <p id="event-details-recurring">{recurringDetail}</p>
            </div>
            <h3>Cost</h3>
            <p>{costDetail}</p>
            <h3>Location</h3>
            <div>
              <p id="event-details-location">
                {location.name}
                <br />
                {location.address}, {location.address_additional}
                <br />
                {location.city}, {location.state} {location.zipcode}
                <br />
                <a id="event-details-location-link" href={link}>
                  View on Map
                </a>
              </p>
            </div>
            <h3>Event Organizer</h3>
            <p id="event-details-organizer">{contact.name}</p>
            <div>
              <SmallIcon fontAwesomeIconClassName="envelope" />
              {contact.email}
            </div>
            <div>
              <SmallIcon fontAwesomeIconClassName="fax" />
              {contact.phone}
            </div>
          </div>
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
