import React from 'react'
import styles from './office-result.scss'
import { ContactCard } from 'molecules'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class DefaultOfficeResult extends React.PureComponent {
  componentDidMount() {
    if (document) {
      const { id, length } = this.props
      if (id === `result-${length - 1}`) {
        document.querySelector('.search-info-panel') && document.querySelector('.search-info-panel').focus()
      }
    }
  }

  getPropertyValue(object, fieldName) {
    const propertyArray = object[fieldName]
    return propertyArray ? propertyArray[0] : ''
  }

  render() {
    const {
      id,
      item: { fields: item, exprs }
    } = this.props
    if (!item) {
      return null
    }
    const title = this.getPropertyValue(item, 'title')

    const contactProps = item
      ? {
          title: this.getPropertyValue(item, 'title'),
          city: this.getPropertyValue(item, 'location_city'),
          streetAddress: this.getPropertyValue(item, 'location_street_address'),
          state: this.getPropertyValue(item, 'location_state'),
          zipCode: this.getPropertyValue(item, 'location_zipcode'),
          email: this.getPropertyValue(item, 'location_email'),
          phoneNumber: this.getPropertyValue(item, 'location_phone_number'),
          fax: this.getPropertyValue(item, 'location_fax'),
          link: this.getPropertyValue(item, 'office_website')
        }
      : {}

    const cardLayoutClassName = classNames({
      'card-layout': true,
      [styles.officeResultContainer]: true,
      [styles.focus]: true
    })
    const resultClassName = classNames({
      [styles.defaultOfficeResult]: true
    })

    //elasticsearch returns all single value elements as an array *sigh*
    return (
      <div
        id={`office-result-container-${id}`}
        className={cardLayoutClassName}
        aria-label={title}
        tabIndex="0"
      >
        <div className={resultClassName}>
          <ContactCard {...contactProps} />
        </div>
      </div>
    )
  }
}

DefaultOfficeResult.defaultProps = {
  id: 'result'
}

DefaultOfficeResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string, //.isRequired
  onClick: PropTypes.func,
  onResultHover: PropTypes.func
}

export default DefaultOfficeResult
