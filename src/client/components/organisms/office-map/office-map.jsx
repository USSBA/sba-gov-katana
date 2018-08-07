import React from 'react'
import config from '../../../services/client-config.js'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import {isEmpty, difference, get} from 'lodash'
import styles from './office-map.scss'
import PropTypes from 'prop-types'
import marker from 'assets/svg/marker.svg'


const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${
  config.googleMapsApiKey
}&v=3.exp&libraries=geometry,drawing,places`

const defaultIconScale = 40;

const OfficeMap = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh`, clear: 'both' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const officeMapStyles = require('./office-map-style.json')
  const { markers, onMapMounted, onDragEnd, onMarkerClick, selectedItem } = props
  const googleMapProps = {
    defaultOptions: {
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: officeMapStyles
    },
    defaultZoom: 10,
    defaultCenter: {
      lat: 38.910353,
      lng: -77.017739
    },
    onDragEnd: onDragEnd
  }
  //todo: move to proper lifecycle method
  if (markers.length > 0) {
    googleMapProps.ref = onMapMounted
    googleMapProps.defaultZoom = 4

    const bounds = new google.maps.LatLngBounds()
    for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i])
    }
    props.setBounds(bounds)
    googleMapProps.defaultCenter = bounds.getCenter()
  }

  return (
    <GoogleMap {...googleMapProps}>
      {markers.map((item, index) => {
        let selectedItemTitle = get(selectedItem, "item.title[0]")
        let itemTitle = get(item, "selfRef.fields.title[0]")
        let iconScale = itemTitle && selectedItemTitle &&  selectedItemTitle=== itemTitle ? defaultIconScale * 1.25 : defaultIconScale;
        let icon = {
          scaledSize: new google.maps.Size(iconScale, iconScale),
          url: marker
        } 
        return (
          <Marker
            key={index}
            position={{
              lat: item.lat,
              lng: item.lng
            }}
            onClick={() => {
              onMarkerClick(item.selfRef)
            }}
            icon={icon}
          />
        )}
      )}
    </GoogleMap>
  )
})

class OfficeMapApp extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      points: [],
      bounds: {},
      map: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    const { items } = nextProps
    const newPoints = this.getLatLngs(items)
    if (difference(newPoints, this.state.points)) {
      this.setState({
        points: newPoints
      })
    }
  }

  getLatLngs(items) {
    const geolocations = []
    items.forEach(item => {
      const { geolocation } = item.fields
      if (!isEmpty(geolocation)) {
        const latLng = geolocation[0].split(',')
        const geocode = {
          lat: Number(latLng[0]),
          lng: Number(latLng[1]),
          selfRef: item
        }
        geolocations.push(geocode)
      }
    })
    return geolocations
  }

  setBounds(bounds) {
    this.bounds = bounds
  }

  onMapMounted(mapRef) {
    // after map has mounted
    // auto-zoom the map to fit all marker points
    if (mapRef !== null) {
      this.setState({
        map: mapRef
      })
      mapRef.fitBounds(this.bounds)
    }
  }

  handleMarkerClick(item) {
    this.props.onMarkerClick(item)
  }

  handleMarkerHover(item) {
    this.props.onMarkerHover(item)
  }

  render() {
    // pass array of points with lats and lngs

    const { points, map } = this.state
    const { onFieldChange } = this.props

    return (
      <div id="google-map" className={styles.googleMap}>
        <OfficeMap
          markers={points}
          setBounds={this.setBounds.bind(this)}
          onMapMounted={this.onMapMounted.bind(this)}
          onDragEnd={() => {
            const mapCenter = map.getCenter()
            this.setState({ points: [] })
            onFieldChange('mapCenter', `${mapCenter.lat()},${mapCenter.lng()}`, {
              shouldTriggerSearch: true,
              shouldResetPageNumber: true
            })
            onFieldChange('mapCenter', '')
          }}
          onMarkerClick={e => {
            const { fields: item, exprs: { distance } } = e
            const selectedItem = {
              item,
              distance
            }
            this.props.onMarkerClick(selectedItem)
          }}
          selectedItem={this.props.selectedItem}
        />
      </div>
    )
  }
}
OfficeMapApp.defaultProps = {
  selectedItem: null,
  items: []
}

OfficeMapApp.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  selectedItem: PropTypes.object,
  onMarkerClick: PropTypes.func,
  onMarkerHover: PropTypes.func
}
export default OfficeMapApp
