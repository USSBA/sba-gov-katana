import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './counselor-map.scss';

const AnyReactComponent = ({ text }) => <div className={styles.marker}><p className={styles.markerText} >{text}</p></div>;



class CounselorMap extends Component {
  constructor(props) {
    super();
  }

  static defaultProps = {
    defaultCenter: {lat: 38.897676, lng: -77.036483},
    zoom: 11
  };

  displayMarkers() {
    let letter = ["A", "B", "C"];
    return this.props.markerLocations.map((marker, index) => {
      return (
        <AnyReactComponent
          lat={marker.lat}
          lng={marker.lng}
          text={letter[index]}
        />
      )
    })
  }

  render() {
    console.log(this.props.userZipCoords)
    return (
      <GoogleMapReact
        defaultCenter={this.props.defaultCenter}
        defaultZoom={this.props.zoom}
        apiKey={"AIzaSyCKowpuwSs7kT_N_cYKdihQ0VdtizEM-hk"}
        center={this.props.userZipCoords ? this.props.userZipCoords : null}
      >

        {this.props.markerLocations ? this.displayMarkers() : this.props.center}

      </GoogleMapReact>
    );
  }
}

export default CounselorMap



