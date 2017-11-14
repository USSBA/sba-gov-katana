import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import styles from './counselor-map.scss'
import { fitBounds } from 'google-map-react/utils'
import findZoomAndCenter from './counselor-map-util.js'

const MapMarker = ({ text }) => (
  <div className={styles.markerContainer}>
    <div className={styles.marker}>
      <p className={styles.markerText}>{text}</p>
      <div className={styles.triangle}>
        <div className={styles.innerTriangle} />
      </div>
    </div>
  </div>
)

class CounselorMap extends Component {
  constructor() {
    super()
    this.state = {
      zoom: null,
      center: null
    }
  }

  static defaultProps = {
    defaultCenter: { lat: 38.897676, lng: -77.036483 },
    defaultZoom: 11
  }

  fitMarkers() {
    if (this.state.zoom == null && this.state.center == null) {
      const size = { width: 600, height: 490 }
      let zoomAndCenter = findZoomAndCenter(
        { size },
        this.props.markerLocations
      )
      this.setState({ zoom: zoomAndCenter.zoom, center: zoomAndCenter.center })
      // let bounds = new google.maps.LatLngBounds();
      // this.props.markerLocations.forEach((marker) => {
      //   bounds.extend(new google.maps.LatLng(marker.lat, marker.lng))
      // });
      // // GET NW, SE BY NE, SW bounds. SE/NW necessary for fitBounds()
      // const ne = bounds.getNorthEast();
      // const sw = bounds.getSouthWest();
      // const nw = { lat: ne.lat(), lng: sw.lng() };
      // const se = { lat: sw.lat(), lng: ne.lng() };
      // const { center, zoom } = fitBounds({
      //   se: { lat: se.lat, lng: se.lng },
      //   nw: { lat: nw.lat, lng: nw.lng }
      // }, { width: 600, height: 490 });
      // this.setState({zoom, center})
    }
  }

  displayMarkers() {
    let letter = ['A', 'B', 'C']
    return this.props.markerLocations.map((marker, index) => {
      return (
        <MapMarker
          key={index}
          lat={marker.lat}
          lng={marker.lng}
          text={letter[index]}
        />
      )
    })
  }

  render() {
    return (
      <GoogleMapReact
        ref="googlemapreacttest"
        apiKey={'AIzaSyCKowpuwSs7kT_N_cYKdihQ0VdtizEM-hk'}
        zoom={this.state.zoom ? this.state.zoom : this.props.defaultZoom}
        center={
          this.state.center ? this.state.center : this.props.defaultCenter
        }
      >
        {this.props.markerLocations && this.state.center && this.state.zoom
          ? this.displayMarkers()
          : null}
        {this.props.markerLocations ? this.fitMarkers() : null}
      </GoogleMapReact>
    )
  }
}

export default CounselorMap
