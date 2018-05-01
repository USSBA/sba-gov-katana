import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'atoms'
import * as ContentActions from '../../../../actions/content.js'
import { logEvent } from '../../../../services/analytics.js'
import CounselorMap from './counselor-map.jsx'
import styles from './counseling-and-tools.scss'

export class DynamicCounselingAndTools extends React.Component {
  constructor() {
    super()
    this.state = {
      counselors: null,
      counselorsErr: null
    }
  }

  componentWillMount() {
    this.props.actions
      .fetchContentIfNeeded('counselors', 'counselors-by-location', {
        zip: this.props.businessInfoData.businessInfoZipcode
      })
      .then(res => {
        let counselorsData = this.props.counselorsData
        this.setState({
          counselors: counselorsData
        })
      })
      .catch(err => {
        this.setState({
          counselorsErr: err
        })
      })
  }

  redirectLocalAssistance() {
    logEvent({
      category: 'Navigation',
      action: 'Button Push',
      label: 'See More'
    })
    let newTab = window.open('', '_blank')
    this.props.actions
      .fetchContentIfNeeded('counselorsRedirect', 'counselors-redirect', {
        zip: this.props.businessInfoData.businessInfoZipcode
      })
      .then(res => {
        newTab.location = res.data.redirectTo
      })
  }

  formatMapObjects() {
    let counselors = this.state.counselors
    if (this.state.counselorsErr || this.state.counselors == null) {
      return null
    } else if (this.state.counselors && this.state.counselorsErr == null) {
      return counselors.map(counselor => {
        return {
          lat: Number.parseFloat(counselor.latitude),
          lng: Number.parseFloat(counselor.longitude)
        }
      })
    }
  }

  getMiles(num) {
    let miles = parseInt(num) * 0.000621371192
    return Math.round(miles * 100) / 100
  }

  trimStr(str) {
    return str.length > 45 ? str.slice(0, 45) + '...' : str
  }

  createCounselorBoxes() {
    const counselors = this.state.counselors
    return Object.keys(counselors).map((key, index) => {
      let counselor = counselors[key]
      return (
        <div key={index} className={styles.counselorBox}>
          <h4 key={1}>{this.trimStr(counselor['title']) || 'Not Available'}</h4>
          <p key={2} className={styles.counselorAttr}>
            {counselor['name'] || 'Not Available'}
          </p>
          <p key={3}>{counselor['street'] + ', ' + counselor['additional'] || 'Not Available'}</p>
          <p key={4}>{counselor['city'] + ', ' + counselor['province'] + ' ' + counselor['postal_code']}</p>
          <p key={5}>{this.getMiles(counselor['location_distance']) + ' miles away'}</p>
          <p key={6}>{counselor['phone'] ? 'Phone: ' + counselor['phone'] : 'Not Available'}</p>
        </div>
      )
    })
  }

  displayCounselors() {
    if (this.state.counselors == null && this.state.counselorsErr == null) {
      return (
        <div className={styles.counselorBox}>
          <div className={styles.loader} />
        </div>
      )
    } else if (this.state.counselors && this.state.counselorsErr == null) {
      return this.createCounselorBoxes()
    } else if (this.state.counselorsErr) {
      return (
        <div className={styles.counselorBox}>
          <p> Sorry we were unable to process your zipcode.</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className={styles.section}>
        <h2>Free local counseling.</h2>
        <h5>
          Local counselors can offer free, personalized help with preparing your loan application. Some
          counseling offices can also introduce you to additional lenders.
        </h5>
        <div className={styles.counselingRow}>
          <div className={styles.counselorContainer}>
            {this.displayCounselors()}
            <Button onClick={() => this.redirectLocalAssistance()} primary>
              See more
            </Button>
          </div>
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              {this.state.counselors ? <CounselorMap markerLocations={this.formatMapObjects()} /> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    businessInfoData: state.lenderMatch.businessInfoData,
    counselorsData: state.contentReducer['counselors']
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicCounselingAndTools)
