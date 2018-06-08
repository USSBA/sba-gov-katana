import React from 'react'
import { GoogleMap, Marker } from 'react-google-maps'

const OfficeMap = props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{
      lat: -34.397,
      lng: 150.644
    }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{
          lat: -34.397,
          lng: 150.644
        }}
      />
    )}
    sfsf
  </GoogleMap>
)

export default OfficeMap
