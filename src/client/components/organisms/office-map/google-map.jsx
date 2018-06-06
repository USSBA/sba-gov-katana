import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
const GOOGLE_MAPS_API_KEY = 'AIzaSyDceQl00lHHE0R9QrY5gonqr4Bu2Q9vLe8'

class GoogleMap extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick} name={'Current location'} />

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
