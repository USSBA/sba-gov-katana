import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Event from '../../templates/event/event.jsx'
import ErrorPage from '../error-page/error-page.jsx'
import { Loader } from 'atoms'
import { isEmpty } from 'lodash'
import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './event-page.scss'

class EventPage extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
      const queryArgs = {
        id: String(this.props.routeParams.eventId)
      }
      console.log('A---')
      const result = await fetchSiteContent('events', queryArgs).catch(_ => this.setState({ data: null }))
       console.log('B---')
      this.setState({ data: result })
  }

  render() {
    const { eventId } = this.props
    const { data } = this.state

    return (
      <div>{JSON.stringify(data)}</div>
    )

    // if (eventId && data) {
    //   if (!isEmpty(data)) {
    //     return (
    //       <div>
    //         <Event eventData={data} />
    //       </div>
    //     )
    //   } else {
    //     return <ErrorPage linkUrl="/events/find" linkMessage="find events page" />
    //   }
    // } else {
    //   return (
    //     <div className={styles.container}>
    //       <Loader />
    //     </div>
    //   )
    // }
  }
}

export default EventPage
