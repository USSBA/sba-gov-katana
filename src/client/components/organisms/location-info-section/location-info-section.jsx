import React from 'react'
import PropTypes from 'prop-types'
import { chunk } from 'lodash'

import { ContactCard } from 'molecules'
import { GenericCardCollection } from 'organisms'
import { fetchRestContent } from '../../../fetch-content-helper'
import styles from './location-info-section.scss'

function getContactCardProps(title, locationInfo, areasServed, testId) {
  const cardProps = {
    testId: testId,
    border: false
  }

  typeof title === 'string' && (cardProps.title = title)
  typeof locationInfo.city === 'string' && (cardProps.city = locationInfo.city)
  typeof locationInfo.email === 'string' && (cardProps.email = locationInfo.email)
  typeof locationInfo.fax === 'string' && (cardProps.fax = locationInfo.fax)
  typeof locationInfo.hoursOfOperation === 'string' &&
    (cardProps.hoursOfOperation = locationInfo.hoursOfOperation)
  typeof locationInfo.phoneNumber === 'string' && (cardProps.phoneNumber = locationInfo.phoneNumber)
  typeof locationInfo.state === 'string' && (cardProps.state = locationInfo.state)
  typeof locationInfo.streetAddress === 'string' && (cardProps.streetAddress = locationInfo.streetAddress)
  typeof locationInfo.zipCode === 'number' && (cardProps.zipCode = locationInfo.zipCode)

  if (testId === 'region-location' && typeof areasServed === 'string' && areasServed.length > 0) {
    cardProps.message = areasServed
  }

  return cardProps
}

class LocationInfoSection extends React.Component {
  constructor() {
    super()
    this.state = {
      alternateOffices: [],
      regionalOffice: null
    }
  }

  async componentDidMount() {
    const { alternateLocations, office } = this.props.office

    // restricts to a maximum of two alternate locations
    const alternateOffices = []
    if (alternateLocations && alternateLocations.length > 0) {
      const alternateOfficeIds = alternateLocations.slice(0, 2)
      for (let i = 0; i < alternateOfficeIds.length; i++) {
        alternateOffices[i] = await fetchRestContent(alternateOfficeIds[i])
      }
    }

    let regionalOffice
    if (office && typeof office === 'number') {
      regionalOffice = await fetchRestContent(office)
    }

    this.setState({ alternateOffices, regionalOffice })
  }

  render() {
    const { office } = this.props
    const { alternateOffices, regionalOffice } = this.state

    // storage for entire office json for any office that needs to display location
    const officesForCards = []

    /*eslint-disable no-param-reassign*/
    office.testId = 'main-location'
    officesForCards.push(office)

    if (alternateOffices.length > 0) {
      alternateOffices.forEach(alternateOffice => {
        alternateOffice.testId = 'alternate-location'
        officesForCards.push(alternateOffice)
      })
    }

    if (regionalOffice) {
      regionalOffice.testId = 'region-location'
      officesForCards.push(regionalOffice)
    }
    /*eslint-enable no-param-reassign*/

    const cardsContent = []
    officesForCards.forEach(officeInfo => {
      if (Array.isArray(officeInfo.location) && officeInfo.location.length > 0) {
        const cardProps = getContactCardProps(
          officeInfo.title,
          officeInfo.location[0],
          officeInfo.areasServed,
          officeInfo.testId
        )
        cardsContent.push(<ContactCard {...cardProps} />)
      }
    })

    if (cardsContent.length === 0) {
      return null
    } else if (cardsContent.length === 4) {
      const cardsContentSections = chunk(cardsContent, 2)
      return (
        <div data-testid="location-info" className={styles.locationInfo}>
          <h3>Location information</h3>
          {cardsContentSections.map((cardsContentSection, index) => (
            <div className={styles.cardCollection} key={index}>
              <GenericCardCollection cardsContent={cardsContentSection} />
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div data-testid="location-info" className={styles.locationInfo}>
          <h3>Location information</h3>
          <GenericCardCollection cardsContent={cardsContent} />
        </div>
      )
    }
  }
}

LocationInfoSection.propTypes = {
  office: PropTypes.object.isRequired
}

export { getContactCardProps }

export default LocationInfoSection
