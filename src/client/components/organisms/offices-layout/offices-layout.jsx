import React from 'react'
//todo: styles
//import styles from './courses-layout.scss'
import { ClientPagingMultiviewLayout, CardCollection } from 'organisms'
//todo: refactor molecules into a Result organism
import { Address, PhoneNumber } from 'molecules'
import { ContactCard } from 'atoms'

class OfficesLayout extends React.PureComponent {
  constructor(ownProps) {
    super()
  }

  cardRenderer(items) {
    // let mappedItems
    // if (items) {
    //   // assume items is length = 12
    //   mappedItems = items.map((item, index) => {
    //     const location = item.location[0]
    //     return (
    //       <Address
    //       key={index}
    //         streetAddress={location.streetAddress}
    //         city={location.city}
    //         state={location.state}
    //         zipCode={location.zipCode.toString()}
    //       />
    //     )
    //   })
    // } else {
    //   mappedItems = <div />
    // }

    return <div />
  }

  render() {
    const { onReset, items } = this.props
    console.log('LS!!!!', this.props)

    return (
      <div className={`card-layout `}>
        {/* <ClientPagingMultiviewLayout
          onReset={onReset}
          items={items}
          pageSize={12}
          rendererOne={this.cardRenderer}
          type="courses"
        /> */}
        {/*Todo: make this a map of results*/}
        {items.map((item, index) => {
          const location = item.location[0]
          return (
            <div key={`office-${index}`}>
              {/*todo: consider making office type a molecule*/}
              <div key={`office-type-${index}`}>{item.officeType}</div>
              <div key={`office-title-${index}`}>{item.title}</div>
              <Address
                key={`office-address-${index}`}
                streetAddress={location.streetAddress}
                city={location.city}
                state={location.state}
                zipCode={location.zipCode.toString()}
              />
              <PhoneNumber key={`office-phone-${index}`} phoneNumber={location.phoneNumber} />
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}

OfficesLayout.defaultProps = {
  onReset: () => {},
  items: []
}

OfficesLayout.propTypes = {
  onReset: React.PropTypes.func,
  items: React.PropTypes.array
}

export default OfficesLayout
