import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Link } from 'atoms'
import { fetchRestContent } from '../../../../client/fetch-content-helper'

export class ContactText extends React.Component {
  constructor() {
    super()
    this.state = {
      mediaContactsData: []
    }
  }

  componentDidMount() {
    this.getMediaContactsData()
  }

  async getMediaContactsData() {
    const { articleContacts, officeContact } = this.props
    const mediaContactsData = []

    // if it exists, use media contacts from the original (article) data
    // otherwise, if it exists, use media contact from the office
    if (!isEmpty(articleContacts) && articleContacts.length > 0) {
      for (let i = 0; i < articleContacts.length; i++) {
        const mediaContact = await fetchRestContent(articleContacts[i])
        mediaContactsData.push(mediaContact)
      }
    } else if (officeContact) {
      const mediaContact = await fetchRestContent(officeContact)
      mediaContactsData.push(mediaContact)
    }

    if (mediaContactsData.length > 0) {
      this.setState({ mediaContactsData })
    }
  }

  // Checks if a given media contact is valid to be displayed on the article page
  isValidMediaContact(mediaContact) {
    const validEmail = !isEmpty(mediaContact.emailAddress)
    const validPhone = !isEmpty(mediaContact.phone)
    return validEmail || validPhone
  }

  render() {
    const { mediaContactsData } = this.state
    const contacts = []

    for (let i = 0; i < mediaContactsData.length; i++) {
      const { name, emailAddress, phone } = mediaContactsData[i]
      let emailAddressLink
      let phoneLink

      // Appends the media contact with the correct string as needed
      if (contacts.length === 0 && this.isValidMediaContact(mediaContactsData[i])) {
        contacts.push('Contact ')
      } else if (mediaContactsData[i - 1] && this.isValidMediaContact(mediaContactsData[i - 1])) {
        contacts.push(', ')
      }

      if (!isEmpty(emailAddress)) {
        emailAddressLink = (
          <Link to={`mailto:${emailAddress}`} key={`email-${i}`}>
            {emailAddress}
          </Link>
        )
      }

      if (!isEmpty(phone)) {
        phoneLink = (
          <Link to={`tel:${phone}`} key={`phone-${i}`}>
            {phone}
          </Link>
        )
      }

      if (emailAddressLink && phoneLink) {
        contacts.push(`${name} at `, emailAddressLink, ' or ', phoneLink)
      } else if (emailAddressLink) {
        contacts.push(`${name} at `, emailAddressLink)
      } else if (phoneLink) {
        contacts.push(`${name} at `, phoneLink)
      }
    }

    return <div data-testid="contact info">{contacts}</div>
  }
}

ContactText.propTypes = {
  articleContacts: PropTypes.arrayOf(PropTypes.number),
  officeContact: PropTypes.number
}

export default ContactText
