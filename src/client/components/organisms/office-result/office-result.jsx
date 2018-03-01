import React from 'react'
import styles from './office-result.scss'
import { Address, PhoneNumber } from 'molecules'
import PropTypes from 'prop-types'

class OfficeResult extends React.PureComponent {
  render() {
    const id = this.props.id
    const item = this.props.item
    console.log('ITEM!!!', this.props)
    if (!item) {
      return null
    }
    const location = item.location[0]
    return (
      <div className={`card-layout`}>
        <div id={`office-result-${id}`}>
          <div id={`office-type-${id}`}>{item.officeType}</div>
          <div id={`office-title-${id}`}>{item.title}</div>
          <Address
            id={`office-address-${id}`}
            streetAddress={location.streetAddress}
            city={location.city}
            state={location.state}
            zipCode={location.zipCode.toString()}
          />
          <PhoneNumber id={`office-phone-${id}`} phoneNumber={location.phoneNumber} />
          <hr />
        </div>
      </div>
    )
  }
}

OfficeResult.defaultProps = {
  id: 'result'
}

OfficeResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string //.isRequired
}

export default OfficeResult
