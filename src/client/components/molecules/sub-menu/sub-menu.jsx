import React from 'react'
import { isEmpty } from 'lodash'
import { SectionLink } from 'atoms'
import { DropdownMenu } from 'molecules'
import styles from './sub-menu.scss'

class SubMenu extends React.Component {
  constructor() {
    super()

    this.state = {
      showTriangleMarker: false
    }
  }

  handleFocus(event) {
    event.preventDefault()
    this.props.onFocus(this.props.menuId)
  }

  componentWillReceiveProps() {
    this.setState({
      showTriangleMarker: true
    })
  }

  setShouldForceTab(bool) {
    console.log('A:', bool)
    this.setState({
      shouldForceTab: bool
    })
  }

  render() {
    let { data, ...rest } = this.props

    const enableTriangleMarker = data.children && !isEmpty(data.children)

    return (
      <li
        className={styles.subMenu}
        key={this.props.menuId}
        onFocus={event => this.handleFocus(event, this.props.menuId)}
        onMouseOut={this.props.onMenuMouseOut}
      >
        <SectionLink
          id={this.props.id + '-title'}
          url={data.link}
          text={data.linkTitle}
          showUnderline={this.props.showUnderline}
          enableTriangleMarker={enableTriangleMarker}
          shouldForceTriangleMarkerVisibility={this.props.shown}
          onMouseOver={this.props.onTitleMouseOver}
          onKeyDown={this.props.onSectionLinkKeyDown}
        >
          <DropdownMenu
            links={data.children}
            {...rest}
            featuredCallout={data.featuredCallout}
          />
        </SectionLink>
      </li>
    )
  }
}

SubMenu.defaultProps = {
  menuId: 0,
  shown: false,
  data: [],
  columnDefintion: [],
  autoFocusOnTitle: false,
  onFocus: function() {},
  onSkipToNext: function() {},
  onFinalBlur: function() {},
  onTitleMouseOver: function() {},
  onMenuMouseOut: function() {},
  onSectionLinkKeyDown: function() {},
  showUnderline: false,
  enableTabbing: false
}
export default SubMenu
