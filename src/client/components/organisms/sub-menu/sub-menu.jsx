import React from 'react'
import { isEmpty } from 'lodash'

import styles from './sub-menu.scss'
import { SectionLink } from 'atoms'
import { DropdownMenu } from 'organisms'
import { getLanguageOverride } from '../../../services/utils.js'

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
    this.setState({
      shouldForceTab: bool
    })
  }

  determineTitleLink(langCode, data) {
    let link = data.link
    let linkTitle = data.linkTitle
    if (langCode === 'es' && data.spanishTranslation) {
      link = data.spanishTranslation.link
      linkTitle = data.spanishTranslation.linkTitle
    }
    return { link, linkTitle }
  }

  render() {
    const { data, ...rest } = this.props
    const langCode = getLanguageOverride()
    const determinedTitleLink = this.determineTitleLink(langCode, data)
    const enableTriangleMarker = data.children && !isEmpty(data.children)

    return (
      <li
        className={styles.subMenu}
        key={this.props.menuId}
        onFocus={event => {
          return this.handleFocus(event, this.props.menuId)
        }}
        onMouseOut={this.props.onMenuMouseOut}
      >
        <SectionLink
          id={this.props.id + '-title'}
          url={determinedTitleLink.link}
          text={determinedTitleLink.linkTitle}
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
            determineTitleLink={this.determineTitleLink}
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
