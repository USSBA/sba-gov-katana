import React from 'react'
import config from '../../../services/client-config.js'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { isEmpty, difference, get } from 'lodash'
import PropTypes from 'prop-types'
import marker from 'assets/svg/marker.svg'
import styles from './office-map.scss'
import officeResultStyles from '../office-result/office-result.scss'
import $ from 'jquery'

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${
  config.googleMapsApiKey
}&v=3.exp&libraries=geometry,drawing,places`

const defaultIconScale = 40

const OfficeMap = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div className="map" style={{ height: `100vh`, clear: 'both' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const officeMapStyles = require('./office-map-style.json')
  const {
    markers,
    onMapMounted,
    onDragEnd,
    onMarkerClick,
    onMarkerHover,
    newCenter,
    selectedItem,
    hoveredMarkerId,
    onTilesLoaded
  } = props
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
    onDragEnd: onDragEnd,
    onTilesLoaded
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

  if (!_.isEmpty(newCenter)) {
    googleMapProps.center = newCenter
  }

  return (
    <GoogleMap {...googleMapProps}>
      {markers.map((item, index) => {
        let selectedItemTitle = get(selectedItem, 'item.title[0]')
        let itemTitle = get(item, 'selfRef.fields.title[0]')
        let iconScale =
          (itemTitle && selectedItemTitle && selectedItemTitle === itemTitle) ||
          hoveredMarkerId === item.selfRef.id
            ? defaultIconScale * 1.25
            : defaultIconScale
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
            onMouseOver={() => {
              onMarkerHover(item.selfRef.id)
            }}
            onMouseOut={() => {
              onMarkerHover('')
            }}
            icon={icon}
            className={styles.focus}
          />
        )
      })}
    </GoogleMap>
  )
})

class OfficeMapApp extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      points: [],
      bounds: {},
      map: {},
      newCenter: '',
      hasSetInitialBounds: false,
      areAllMapElementsRemovedFromTabOrder: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { items, isDragging } = nextProps
    const { map, areAllMapElementsRemovedFromTabOrder } = this.state
    const newPoints = this.getLatLngs(items)
    if (difference(newPoints, this.state.points)) {
      this.setState(
        {
          points: newPoints
        },
        () => {
          if (!isDragging && !isEmpty(map)) {
            map.fitBounds(this.bounds)
          }
        }
      )
    }

    /*
      - remove all of the google map elements rendered out of the browser tab order
      - the google map object should have a total of 9 elements with a tabindex
      - this includes the following elements:
      - - .map [tabindex] (1 returns)
      - - .map iframe (1 returns)
      - - .map a (4 return)
      - - .map button (3 return)
      - we hard-code the 9 amount here because this code has to run in the "componentWillReceiveProps" lifecycle method
        and not all 9 elements render out during the first few renders
        but once all 9 have been rendered out AND each has a tabindex set to -1
        don't run this code any more (this guard clause prevents unneccessary calls made after our goal is met)
    */

    const totalElementsToBeRemoved = 9
    if (
      !areAllMapElementsRemovedFromTabOrder &&
      document.querySelectorAll('.map [tabindex="999"]').length !== totalElementsToBeRemoved
    ) {
      this.removeMapElementsFromTabOrder()
    } else {
      this.setState({ areAllMapElementsRemovedFromTabOrder: true })
    }
  }

  removeMapElementsFromTabOrder() {
    const removeFromTabOrder = document.querySelectorAll(
      '.map [tabindex], .map iframe, .map a, .map button'
    )
    for (let i = 0; i < removeFromTabOrder.length; i++) {
      const el = removeFromTabOrder[i]
      const tabIndex = el.getAttribute('tabindex')
      if (Number(tabIndex) !== 999) {
        el.setAttribute('tabindex', 999)
      }
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
      this.setState(
        {
          map: mapRef
        },
        () => {
          if (!this.state.hasSetInitialBounds) {
            mapRef.fitBounds(this.bounds)
            this.setState({ hasSetInitialBounds: true })
          }
        }
      )
    }
  }

  handleMarkerClick(selectedItem) {
    this.props.onMarkerClick(selectedItem)
  }

  handleMarkerHover(id) {
    this.props.onMarkerHover(id)
  }

  render() {
    //Checks browser for availability of geolocation api, and Prompts for location permission
    if (navigator.geolocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocationInfo)
      }
      function displayLocationInfo(position) {
        const lng = position.coords.longitude
        const lat = position.coords.latitude

        console.log(`longitude: ${lng} | latitude: ${lat}`)
      }
    } else {
      //
    }

    // pass array of points with lats and lngs

    const { points, map } = this.state
    const { onFieldChange, selectedItem, newCenter, onDragEnd, hoveredMarkerId } = this.props

    return (
      <div id="google-map" className={styles.googleMap}>
        <OfficeMap
          markers={points}
          setBounds={this.setBounds.bind(this)}
          onMapMounted={this.onMapMounted.bind(this)}
          onTilesLoaded={this.removeMapElementsFromTabOrder.bind(this)}
          onDragEnd={() => {
            const mapCenter = map.getCenter()
            this.setState({ points: [] })
            onDragEnd()
            onFieldChange('mapCenter', `${mapCenter.lat()},${mapCenter.lng()}`, {
              shouldTriggerSearch: true,
              shouldResetPageNumber: true
            })
            onFieldChange('mapCenter', '')
          }}
          onMarkerClick={e => {
            const {
              fields: item,
              exprs: { distance }
            } = e
            const selectedItem = {
              item,
              distance
            }
            this.handleMarkerClick(selectedItem)
          }}
          onMarkerHover={id => {
            this.handleMarkerHover(id)
          }}
          newCenter={newCenter}
          selectedItem={this.props.selectedItem}
          hoveredMarkerId={hoveredMarkerId}
        />
      </div>
    )
  }
}
OfficeMapApp.defaultProps = {
  selectedItem: null,
  items: [],
  isDragging: false,
  onMarkerClick: () => {},
  onMarkerHover: () => {}
}

OfficeMapApp.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  selectedItem: PropTypes.object,
  onMarkerClick: PropTypes.func,
  onMarkerHover: PropTypes.func,
  onDragEnd: PropTypes.func,
  isDragging: PropTypes.bool
}
export default OfficeMapApp
