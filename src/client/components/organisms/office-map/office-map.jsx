import React from 'react'
import GoogleMap from './google-map.jsx'
import styles from './office-map.scss'

class OfficeMap extends React.PureComponent {
  render() {
    return (
      <div id="google-map" className={styles.googleMap}>
        <GoogleMap />
      </div>
    )
  }
}

export default OfficeMap
