import React from 'react'
import styles from './office-result.scss'
import { Address, PhoneNumber } from 'molecules'
import { LargePrimaryButton } from 'atoms'
import PropTypes from 'prop-types'

class OfficeResult extends React.PureComponent {
  render() {
    const id = this.props.id
    const item = this.props.item.fields
    console.log('ITEM!!!', this.props.item.fields)
    if (!item) {
      return null
    }

    //elasticsearch returns all single value elements as an array *sigh*
    return (
      <div className={`card-layout`}>
        <div id={`office-result-${id}`}>
          <div id={`office-type-${id}`}>{item.office_type[0]}</div>
          <div id={`office-title-${id}`}>{item.title[0]}</div>
          <Address
            id={`office-address-${id}`}
            streetAddress={item.location_street_address[0]}
            city={item.location_city[0]}
            state={item.location_state[0]}
            /*todo: fix zipcode once not null from cloudsearch*/
            zipCode={item.location_zipcode ? item.location_zipcode[0] : '-'}
          />
          {item.location_phone_number ? (
            <PhoneNumber id={`office-phone-${id}`} phoneNumber={item.location_phone_number[0]} />
          ) : null}
          {item.office_service ? (
            <div>
              {' '}
              Services
              <div>{item.office_service.join(',')}</div>
            </div>
          ) : null}

          {item.office_website ? (
            <div id={`office-website-button-${id}`}>
              <LargePrimaryButton url={item.office_website} text="View Website" />
            </div>
          ) : null}
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
