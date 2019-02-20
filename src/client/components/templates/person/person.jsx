import React, { Component } from 'react'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
import { fetchSiteContent } from '../../../fetch-content-helper'

import styles from './person.scss'
import { DecorativeDash, Label, Link } from 'atoms'
import { Breadcrumb, ContactCard } from 'molecules'

class Person extends Component {
  createContact(email, fax, phoneNumber) {
    const contact = {}

    if (!isEmpty(email)) {
      contact.email = email
    }
    if (!isEmpty(fax)) {
      contact.fax = fax
    }
    if (!isEmpty(phoneNumber)) {
      contact.phoneNumber = phoneNumber
    }

    return contact
  }

  renderText(text) {
    if (text) {
      const split = text.split('\n')
      return split.map(function(item, index) {
        return (
          <p className={styles.bio} key={index}>
            {item}
          </p>
        )
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

    const {
      bio,
      emailAddress: email,
      fax,
      name,
      officeTitle,
      picture,
      phone: phoneNumber,
      title
    } = this.props.personData

    const contact = this.createContact(email, fax, phoneNumber)

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
                url: this.props.pathname
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
          {!isEmpty(picture) ? <img alt={picture.alt} className={styles.avatar} src={picture.src} /> : null}
          <div>{!isEmpty(bio) ? this.renderText(bio) : null}</div>
        </div>
      </div>
    )
  }
}

export default Person
