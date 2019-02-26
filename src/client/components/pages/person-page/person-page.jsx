import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import Person from '../../templates/person/person.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './person-page.scss'
import { Loader } from 'atoms'

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
    const person = persons.find(({ url }) => url === pathname.slice(0, -1))

    let officeWithPersonMatch
    if (!isEmpty(person) && !isEmpty(offices)) {
      officeWithPersonMatch = offices.find(({ id }) => id === person.office)
    }

    const result = officeWithPersonMatch ? { ...person, officeTitle: officeWithPersonMatch.title } : person
    this.setState({ person: result })
  }

  render() {
    const { pathname } = this.props.location
    const { person } = this.state

    if (pathname && !isEmpty(person)) {
      return (
        <div>
          <Person personData={person} pathname={pathname} />
        </div>
      )
    } else {
      return (
        <div className={styles.container}>
          <Loader />
        </div>
      )
    }
  }
}

PersonPage.propTypes = {
  person: PropTypes.object
}

export default PersonPage
