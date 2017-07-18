import React from 'react'
import _ from 'lodash';

import s from "./tile-collection.scss";
import Tile from "./tile.jsx"

class TileCollection extends React.Component {

  makeTile(object, index) {
    let iconElement = this.props.icons[index];
    let tileProps = {
      id: 'tile-' + index,
      key: index,
      data: object,
      icon: iconElement.icon,
      backgroundLines: iconElement.background,
      iconWhite: iconElement.iconWhite,
      hoverShowsInverseOnly: this.props.hoverShowsInverseOnly,
      size: this.props.icons.length,
      uppercaseFirstWord: this.props.uppercaseFirstWord,
      splitTitle: this.props.splitTitle
    };
    return (<Tile {...tileProps}/>);
  }

  render() {
    if (!this.props.data) {
      return (<div/>);
    } else if (this.props.data.length !== this.props.icons.length) {
      console.error("Invalid number of icons provided to tile collection");
      console.log(this.props.data);
      console.log(this.props.icons);
      return (<div/>);
    }
    return (
      <div>
        {this.props.data.map(this.makeTile.bind(this))}
      </div>
    );
  }
}

TileCollection.defaultProps = {
  data: [],
  icons: {},
  hoverShowsInverseOnly: false,
  uppercaseFirstWord: false,
  splitTitle: false
}

export default TileCollection;
