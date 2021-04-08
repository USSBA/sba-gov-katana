import React from 'react'
import config from '../../../services/client-config.js'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { isEmpty, isPlainObject, difference, get } from 'lodash'
import PropTypes from 'prop-types'
import marker from 'assets/svg/marker.svg'
import districtOfficeMarker from 'assets/svg/districtOfficeMarker.svg'
import styles from './office-map.scss'
import clientConfig from '../../../services/client-config.js'
import officeResultStyles from '../office-result/office-result.scss'
import officeMapStyles from './office-map-style.json'
import classNames from 'classnames'

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`

export function displayLocationInfo(position) {
  const lng = position.coords.longitude
  const lat = position.coords.latitude

  //ADDED FOR TESTING PURPOSES. REMOVE WHEN IMPLEMENTING FEATURE
  alert(`longitude: ${lng} | latitude: ${lat}`)
}

const defaultIconScale = 40
const defaultMapPadding = {
  left: 541,
  right: 541
}

/* eslint-disable no-undef */
const OfficeMap = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `80vh` }} />,
    containerElement: <div style={{ height: `80vh` }} />,
    mapElement: <div className="map" style={{ height: `80vh`, clear: 'both' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
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
    defaultZoom: 4.7,
    defaultCenter: {
      lat: 35.7301003,
      lng: -97.096161
    },
    onDragEnd: onDragEnd,
    onTilesLoaded
  }
  // TODO: move to proper lifecycle method
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

  if (!isEmpty(newCenter)) {
    googleMapProps.center = newCenter
  }

  return (
    <GoogleMap {...googleMapProps}>
      {markers.map((item, index) => {
        const selectedItemTitle = get(selectedItem, 'item.title[0]')
        const itemTitle = get(item, 'selfRef.fields.title[0]')
        const iconScale =
          (itemTitle && selectedItemTitle && selectedItemTitle === itemTitle) ||
          hoveredMarkerId === item.selfRef.id
            ? defaultIconScale * 1.25
            : defaultIconScale

        const icon = {
          scaledSize: new google.maps.Size(iconScale, iconScale),
          url: index === 0 && props.mapType === 'office' ? districtOfficeMarker : marker
        }
        return (
          <Marker
            key={index}
            position={{
              lat: item.lat,
              lng: item.lng
            }}
            zIndex={index === 0 && props.mapType === 'office' ? 100 : 0}
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
    const { items, shouldCenterMap } = nextProps
    const { map, areAllMapElementsRemovedFromTabOrder } = this.state
    const newPoints = this.getLatLngs(items)
    if (difference(newPoints, this.state.points)) {
      this.setState(
        {
          points: newPoints
        },
        () => {
          if (!shouldCenterMap && !isEmpty(map)) {
            this.fitBoundsWithPadding(map, this.bounds, defaultMapPadding)
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
      const element = removeFromTabOrder[i]
      const tabIndex = element.getAttribute('tabindex')
      if (Number(tabIndex) !== 999) {
        element.setAttribute('tabindex', 999)
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
            this.fitBoundsWithPadding(mapRef, this.bounds, defaultMapPadding)
            this.setState({ hasSetInitialBounds: true })
          }
        }
      )
    }
  }

  /*
    - natively, google maps fitBounds() allows for a "padding" parameter to go in as it's second argument
    - ie: mapRef.fitBounds(bounds, parameter)
    - the problem with this is that it assigns the same padding value to all four sides of the bounding box
    - Here is very cool sizing solution found on stackoverflow:
    - - https://stackoverflow.com/a/43761322
    - this enables padding values to be assigned to individual sides of the map bounding box
  */

  /* eslint-disable no-param-reassign */
  fitBoundsWithPadding(gMap, bounds, paddingXY) {
    const projection = gMap.getProjection()
    if (projection) {
      if (!isPlainObject(paddingXY)) {
        paddingXY.x = 0
        paddingXY.y = 0
      }

      const paddings = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }

      if (paddingXY.left) {
        paddings.left = paddingXY.left
      } else if (paddingXY.x) {
        paddings.left = paddingXY.x
        paddings.right = paddingXY.x
      }

      if (paddingXY.right) {
        paddings.right = paddingXY.right
      }

      if (paddingXY.top) {
        paddings.top = paddingXY.top
      } else if (paddingXY.y) {
        paddings.top = paddingXY.y
        paddings.bottom = paddingXY.y
      }

      if (paddingXY.bottom) {
        paddings.bottom = paddingXY.bottom
      }

      // copying the bounds object, since we will extend it
      /* eslint-disable-next-line no-param-reassign */
      bounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast())

      // SW
      let point1 = projection.fromLatLngToPoint(bounds.getSouthWest())

      // we must call fitBounds 2 times - first is necessary to set up a projection with initial (actual) bounds
      // and then calculate new bounds by adding our pixel-sized paddings to the resulting viewport
      gMap.fitBounds(bounds)

      let point2 = new google.maps.Point(
        (typeof paddings.left === 'number' ? paddings.left : 0) / Math.pow(2, gMap.getZoom()) || 0,
        (typeof paddings.bottom === 'number' ? paddings.bottom : 0) / Math.pow(2, gMap.getZoom()) || 0
      )

      let newPoint = projection.fromPointToLatLng(
        new google.maps.Point(point1.x - point2.x, point1.y + point2.y)
      )

      bounds.extend(newPoint)

      // NE
      point1 = projection.fromLatLngToPoint(bounds.getNorthEast())
      point2 = new google.maps.Point(
        (typeof paddings.right === 'number' ? paddings.right : 0) / Math.pow(2, gMap.getZoom()) || 0,
        (typeof paddings.top === 'number' ? paddings.top : 0) / Math.pow(2, gMap.getZoom()) || 0
      )
      newPoint = projection.fromPointToLatLng(
        new google.maps.Point(point1.x + point2.x, point1.y - point2.y)
      )

      bounds.extend(newPoint)

      gMap.fitBounds(bounds)
    }
  }
  /* eslint-enable no-param-reassign */
  /* eslint-enable no-undef */

  handleMarkerClick(selectedItem) {
    this.props.onMarkerClick(selectedItem)
  }

  handleMarkerHover(id) {
    this.props.onMarkerHover(id)
  }

  render() {
    //Checks browser for availability of geolocation api, and Prompts for location permission
    if (clientConfig.geoLocator === true && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo)
    }

    // pass array of points with lats and lngs

    const { points, map } = this.state
    const { onFieldChange, selectedItem, newCenter, onDragEnd, hoveredMarkerId, total } = this.props

    const className = classNames({
      [styles.googleMap]: true,
      [styles.hasResults]: Boolean(total)
    })

    return (
      <div id="google-map" className={className}>
        <OfficeMap
          mapType={this.props.mapType}
          markers={points}
          setBounds={this.setBounds.bind(this)}
          onMapMounted={this.onMapMounted.bind(this)}
          onTilesLoaded={this.removeMapElementsFromTabOrder.bind(this)}
          onDragEnd={() => {
            if (!isEmpty(map)) {
              const mapCenter = map.getCenter()
              this.setState({ points: [] })
              onDragEnd()
              onFieldChange(
                'mapCenter',
                `${mapCenter.lat()},${mapCenter.lng()}`,
                {
                  shouldTriggerSearch: true,
                  shouldResetPageNumber: true
                },
                () => {
                  onFieldChange('address', '')
                }
              )
            }
          }}
          onMarkerClick={e => {
            const { fields: item, exprs } = e
            const distance = exprs ? exprs.distance : null
            const markerSelectedItem = {
              item,
              distance
            }
            this.handleMarkerClick(markerSelectedItem)
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
  shouldCenterMap: false,
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
  shouldCenterMap: PropTypes.bool
}
export default OfficeMapApp
