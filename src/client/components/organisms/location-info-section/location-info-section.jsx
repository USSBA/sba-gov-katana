import React from 'react'
import PropTypes from 'prop-types'
import { ContactCard } from 'molecules'
import { GenericCardCollection } from 'organisms'
import { fetchRestContent } from '../../../fetch-content-helper'
import styles from './location-info-section.scss'

function getContactCardProps(locationInfo, areasServed, testId) {
  const cardProps = {
    testId: testId,
    border: false
  }

  typeof locationInfo.city === 'string' && (cardProps.city = locationInfo.city)
  typeof locationInfo.email === 'string' && (cardProps.email = locationInfo.email)
  typeof locationInfo.fax === 'string' && (cardProps.fax = locationInfo.fax)
  typeof locationInfo.hoursOfOperation === 'string' &&
    (cardProps.hoursOfOperation = locationInfo.hoursOfOperation)
  typeof locationInfo.name === 'string' && (cardProps.title = locationInfo.name)
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
      alternateLocations: [],
      region: null
    }
  }

  async componentDidMount() {
    const { office } = this.props

    // restricts to a maximum of two alternate locations
    const alternateLocations = []
    if (office.alternateLocations && office.alternateLocations.length > 0) {
      const alternateOfficeIds = office.alternateLocations.slice(0, 2)
      for (let i = 0; i < alternateOfficeIds.length; i++) {
        alternateLocations[i] = await fetchRestContent(alternateOfficeIds[i])
      }
    }

    let region
    if (office.office && typeof office.office === 'number') {
      region = await fetchRestContent(office.office)
    }

    this.setState({ alternateLocations, region })
  }

  render() {
    const { office } = this.props
    const { alternateLocations, region } = this.state

    const officesForCards = []

    /*eslint-disable no-param-reassign*/
    office.testId = 'main-location'
    officesForCards.push(office)

    if (alternateLocations.length > 0) {
      alternateLocations.forEach(alternateLocation => {
        alternateLocation.testId = 'alternate-location'
        officesForCards.push(alternateLocation)
      })
    }

    if (region) {
      region.testId = 'region-location'
      officesForCards.push(region)
    }
    /*eslint-enable no-param-reassign*/

    const cardsContent = []
    officesForCards.forEach(officeInfo => {
      if (Array.isArray(officeInfo.location) && officeInfo.location.length > 0) {
        const cardProps = getContactCardProps(
          officeInfo.location[0],
          officeInfo.areasServed,
          officeInfo.testId
        )
        cardsContent.push(<ContactCard {...cardProps} />)
      }
    })

    if (cardsContent.length > 0) {
      return (
        <div data-testid="location-info" className={styles.locationInfo}>
          <h3>Location information</h3>
          <GenericCardCollection cardsContent={cardsContent} />
        </div>
      )
    } else {
      return null
    }
  }
}

LocationInfoSection.propTypes = {
  office: PropTypes.object.isRequired
}

export { getContactCardProps }

export default LocationInfoSection
