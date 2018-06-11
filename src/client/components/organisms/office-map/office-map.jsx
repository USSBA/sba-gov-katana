import React from 'react'
import config from '../../../services/client-config.js'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import axios from 'axios'
import queryString from 'query-string'
import styles from './office-map.scss'
var geocoder = require('google-geocoder')

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${
  config.googleMapsApiKey
}&v=3.exp&libraries=geometry,drawing,places`
const geo = geocoder({
  key: config.googleMapsApiKey
})

const OfficeMap = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const { markers } = props
  let googleMapProps = {}
  if (markers.length > 0) {
    googleMapProps.ref = props.onMapMounted
    googleMapProps.defaultZoom = 4

    const bounds = new google.maps.LatLngBounds()
    for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i])
    }
    props.setBounds(bounds)
    googleMapProps.defaultCenter = bounds.getCenter()
  } else {
    // default to zipcode 20001
    googleMapProps.defaultZoom = 10
    googleMapProps.defaultCenter = {
      lat: 38.910353,
      lng: -77.017739
    }
  }

  return (
    <GoogleMap {...googleMapProps}>
      {markers.map((item, index) => (
        <Marker
          key={index}
          position={{
            lat: item.lat,
            lng: item.lng
          }}
        />
      ))}
    </GoogleMap>
  )
})

class OfficeMapApp extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      points: [],
      bounds: {}
    }
  }

  componentWillMount() {
    // get office data from endpoint
    // update state points object with results

    let endpoint = '/api/content/offices.json'
    if (window.location.search.length > 0) {
      const params = queryString.parse(window.location.search)
      let qs = ''
      if (params.zipCode) {
        qs += `zipCode=${params.zipCode}&`
      }
      if (params.start && typeof params.start === 'number') {
        qs += `start=${params.start}`
      }
      endpoint = `${endpoint}?${qs}`
    }

    axios.get(endpoint).then(result => {
      this.getLatLngs(result.data.hit).then(result => {
        const points = result
        this.setState({ points })
      })
    })
  }

  getLatLngs(items) {
    let geolocations = []
    items.forEach(item => {
      // if geolocation data available
      // set geolocation
      // else
      // query geocoder service for geolocation

      let promise
      if (item.fields.geolocation) {
        const latLng = item.fields.geolocation[0].split(',')
        promise = Promise.resolve({
          lat: Number(latLng[0]),
          lng: Number(latLng[1])
        })
      } else {
        promise = new Promise((resolve, reject) => {
          const address = `${item.fields.location_street_address} ${item.fields.location_city} ${
            item.fields.location_state
          } ${item.fields.location_zipcode}`
          geo.find(address, (err, result) => {
            resolve({
              lat: result[0].location.lat,
              lng: result[0].location.lng
            })
          })
        })
      }

      geolocations.push(promise)
    })

    return Promise.all(geolocations)
  }

  setBounds(bounds) {
    this.bounds = bounds
  }

  onMapMounted(mapRef) {
    // after map has mounted
    // auto-zoom the map to fit all marker points
    if (mapRef !== null) {
      mapRef.fitBounds(this.bounds)
    }
  }

  render() {
    // pass array of points with lats and lngs

    const { points } = this.state

    return (
      <div id="google-map" className={styles.googleMap}>
        <OfficeMap
          markers={this.state.points}
          setBounds={this.setBounds.bind(this)}
          onMapMounted={this.onMapMounted.bind(this)}
        />
      </div>
    )
  }
}

export default OfficeMapApp
