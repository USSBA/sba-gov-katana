import React from 'react'
import _ from 'lodash'
import Tile from './tile.jsx'
import s from './tile-collection.scss'

class TileCollection extends React.Component {
  constructor() {
    super()
    this.state = {
      enteringInReverse: false,
      markAsEnteringInReverse: false,
      panelShowingHoverState: -1
    }
  }

  onFocus(index) {
    this.setState({
      panelShowingHoverState: index,
      enteringInReverse: this.state.markAsEnteringInReverse,
      markAsEnteringInReverse: false
    })
  }

  onBlur(index) {
    this.setState({
      panelShowingHoverState: -1,
      markAsEnteringInReverse: false
    })
  }

  onTabBackwards(index, recentlyEnteringInReverse) {
    console.log('index', index)
    console.log('recentlyEnteringInReverse', recentlyEnteringInReverse)
    this.setState({
      panelShowingHoverState: index,
      markAsEnteringInReverse: true
    })
  }

  makeTile(object, index) {
    const iconElement = this.props.icons[index]
    const tileProps = {
      id: 'tile-' + index,
      key: index,
      data: object,
      icon: iconElement.icon,
      backgroundLines: iconElement.background,
      iconWhite: iconElement.iconWhite,
      size: this.props.icons.length,
      uppercaseFirstWord: this.props.uppercaseFirstWord,
      splitTitle: this.props.splitTitle,
      onFocus: () => {
        this.onFocus(index)
      },
      onBlur: () => {
        this.onBlur(index)
      },
      onMouseExit: () => {
        this.onBlur(index)
      },
      onTabBackwards: () => {
        this.onTabBackwards(index)
      },
      enteringInReverse: this.state.enteringInReverse,
      showHover: index === this.state.panelShowingHoverState,
      neverDisplayChildrenOnHoverOverride: this.props.neverDisplayChildrenOnHoverOverride
    }
    return <Tile {...tileProps} />
  }

  render() {
    if (!this.props.data) {
      return <div />
    } else if (this.props.data.length !== this.props.icons.length) {
      console.error('Invalid number of icons provided to tile collection')
      console.error(this.props.data)
      console.error(this.props.icons)
      return <div />
    }
    return <div>{this.props.data.map(this.makeTile.bind(this))}</div>
  }
}

TileCollection.defaultProps = {
  data: [],
  icons: {},
  neverDisplayChildrenOnHoverOverride: false,
  uppercaseFirstWord: false,
  splitTitle: false
}

export default TileCollection
