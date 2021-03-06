import React from 'react'
import { Tile } from 'organisms'
import icons from './icons'

class MenuTileCollection extends React.Component {
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
    this.setState({
      panelShowingHoverState: index,
      markAsEnteringInReverse: true
    })
  }

  makeTile(object, index) {
    // TODO: better error checking here and determine why some icons are coming up as undefined (see TA-3330)
    try {
      const sectionName = object.fullUrl.slice(
        1,
        object.fullUrl.indexOf('/', object.fullUrl.indexOf('/') + 1)
      )
      const iconElement = icons[sectionName][index]
      const tileProps = {
        id: 'tile-' + index,
        key: index,
        data: object,
        icon: iconElement.icon,
        backgroundLines: iconElement.background,
        iconWhite: iconElement.iconWhite,
        pathname: this.props.pathname,
        size: icons[sectionName].length,
        uppercaseFirstWord: this.props.uppercaseFirstWord,
        smallTile: this.props.smallTile,
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
    } catch {
      console.log('Error with creating icons')
    }
  }

  render() {
    const { data } = this.props

    if (!data) {
      return <div />
    }
    return <div>{data.map(this.makeTile.bind(this))}</div>
  }
}

MenuTileCollection.defaultProps = {
  data: [],
  icons: {},
  neverDisplayChildrenOnHoverOverride: false,
  uppercaseFirstWord: false,
  splitTitle: false
}

export default MenuTileCollection
