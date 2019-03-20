import React, { Component } from 'react'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
import { fetchSiteContent } from '../../../fetch-content-helper'

import styles from './person.scss'
import { DecorativeDash, Label, Link } from 'atoms'
import { Breadcrumb, ContactCard } from 'molecules'

class Person extends Component {
  render() {
    const {
      personData: {
        bio,
        emailAddress: email,
        fax,
        name,
        office: { name: officeName },
        picture,
        phone: phoneNumber,
        title
      },
      pathname
    } = this.props

    const className = classNames({
      'person-page': true,
      [styles.personPage]: true
    })

    const contentClassName = classNames({
      [styles.content]: true,
      [styles.hasPicture]: !isEmpty(picture)
    })

    const contact = {
      ...(!isEmpty(email) && { email }),
      ...(!isEmpty(fax) && { fax }),
      ...(!isEmpty(phoneNumber) && { phoneNumber })
    }

    return (
      <div className={className}>
        {/* Breadcrumb will release in future update
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
                url: pathname
              }
            ]}
          />
        </div>
        */}
        <Label large type="Person" />
        <div className={styles.header}>
          <div>
            <h1>{name}</h1>
            {!isEmpty(title) && <h5>{title}</h5>}
            {!isEmpty(officeName) && <p className={styles.officeName}>{officeName}</p>}
          </div>
          <div className={styles.contact}>
            <ContactCard {...contact} />
          </div>
        </div>
        <div className={contentClassName}>
          {!isEmpty(picture) && <img alt={picture.alt} className={styles.avatar} src={picture.src} />}
          {!isEmpty(bio) && <div dangerouslySetInnerHTML={{ __html: bio }} />}
        </div>
      </div>
    )
  }
}

export default Person
