import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
const GOOGLE_MAPS_API_KEY = 'AIzaSyDceQl00lHHE0R9QrY5gonqr4Bu2Q9vLe8'

class GoogleMap extends React.Component {
  constructor() {
    super()

    const points = [
      { lat: 42.02, lng: -77.01 },
      { lat: 42.03, lng: -77.02 },
      { lat: 41.03, lng: -77.04 },
      { lat: 42.05, lng: -77.02 }
    ]

    this.state = {
      points
    }
  }

  componentWillMount() {}

  onMarkerClick() {}

  renderMarkers(items) {
    return items.map((item, index) => {
      return <Marker key={index} onClick={this.onMarkerClick} name={'Current location'} position={item} />
    })
  }

  render() {
    const bounds = new this.props.google.maps.LatLngBounds()
    for (let i = 0; i < this.state.points.length; i++) {
      bounds.extend(this.state.points[i])
    }

    return (
      <Map google={this.props.google} zoom={14} bounds={bounds}>
        {this.renderMarkers(this.state.points)}

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>test</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(GoogleMap)
