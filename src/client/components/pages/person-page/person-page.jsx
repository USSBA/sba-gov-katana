import React, { Component } from 'react'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
import { fetchSiteContent } from '../../../fetch-content-helper'

import styles from './person-page.scss'
import { DecorativeDash, Label, Link } from 'atoms'
import { Breadcrumb, ContactCard } from 'molecules'

class PersonPage extends Component {
  constructor() {
    super()
    this.state = {
      person: null
    }
  }

  async componentDidMount() {
    const pathname = this.props.location.pathname
    const offices = await fetchSiteContent('officesRaw')
    const persons = await fetchSiteContent('persons')
    const person = persons.find(personObj => personObj.url === pathname.slice(0, -1))

    let officeWithPersonMatch
    if (!isEmpty(person) && !isEmpty(offices)) {
      officeWithPersonMatch = offices.find(officeObj => officeObj.id === person.office)
    }

    const result = officeWithPersonMatch ? { ...person, officeTitle: officeWithPersonMatch.title } : person
    this.setState({ person: result })
  }

  renderText(text) {
    if (text) {
      const split = text.split('\n')
      return split.map(function(item, index) {
        return <p className={styles.bio}>{item} </p>
      })
    } else {
      return <div />
    }
  }

  render() {
    const className = classNames({
      'person-page': true,
      [styles.personPage]: true
    })

    if (this.state.person !== null) {
      const {
        person: { bio, emailAddress: email, fax, name, officeTitle, picture, phone: phoneNumber, title }
      } = this.state

      const contact = {
        email,
        fax,
        phoneNumber
      }

      return (
        <div className={className}>
          <div className={styles.breadcrumb}>
            <Breadcrumb
              items={[
                {
                  title: 'About SBA',
                  url: '/about-sba'
                },
                {
                  title: 'People',
                  url: '/person'
                },
                {
                  title: name,
                  url: this.props.location.pathname
                }
              ]}
            />
          </div>
          <Label large type="Person" />
          <div className={styles.header}>
            <div>
              <h1>{name}</h1>
              {!isEmpty(title) ? <h5>{title}</h5> : null}
              {!isEmpty(officeTitle) ? <p className={styles.officeTitle}>{officeTitle}</p> : null}
            </div>
            <div className={styles.contact}>
              <ContactCard {...contact} />
            </div>
          </div>
          <div className={styles.content}>
            {!isEmpty(picture) ? (
              <img alt={picture.alt} className={styles.avatar} src={picture.src} />
            ) : null}
            <div>{!isEmpty(bio) ? this.renderText(bio) : null}</div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default PersonPage
