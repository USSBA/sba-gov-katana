import React from 'react'
import { kebabCase } from 'lodash'

import clientConfig from '../../../../services/client-config.js'
import searchIcon from 'assets/svg/mobile-menu/search-icon.svg'
import nearYouIcon from 'assets/svg/mobile-menu/near-you-icon.svg'
import calendarIcon from 'assets/svg/mobile-menu/calendar-icon.svg'
import styles from './mobile-nav.scss'
import { determineMainMenuTitleLink, getLanguageOverride } from '../../../../services/utils'
import { TRANSLATIONS } from '../../../../translations'
import { HamburgerIcon, Link, MainLogo, SectionLink } from 'atoms'

class MobileNav extends React.Component {
  constructor(props) {
    super()
    this.state = {
      expanded: false,
      navHeight: 450,
      searchValue: ''
    }
    this.updateNavHeight = this.updateNavHeight.bind(this)
  }

  updateNavHeight() {
    const heightOffset = 130 + this.props.additionalMenuOffset
    const newHeight = window.innerHeight - heightOffset
    this.setState({ navHeight: newHeight })
  }

  componentDidMount() {
    this.updateNavHeight()
    window.addEventListener('resize', this.updateNavHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateNavHeight)
  }

  createMenuItems() {
    const { mainMenuData } = this.props
    const langCode = getLanguageOverride(true)
    let menuItems = []

    const wrapLink = (index, child) => (
      <div key={index} className={`mobile-nav-menu-item ${styles.mobileNavMenuLink}`}>
        {child}
      </div>
    )

    if (mainMenuData) {
      menuItems = mainMenuData.map((item, index) => {
        const { link, linkTitle } = determineMainMenuTitleLink(langCode, item)

        return wrapLink(
          link,
          <SectionLink id={kebabCase(`main-menu-link ${index}`)} url={link} text={linkTitle} />
        )
      })
    } else {
      menuItems.push(<div key={1} />)
    }

    const baseLength = mainMenuData ? mainMenuData.length : 2
    const secondaryMenuItems = [
      {
        key: 'sbaEnEspanol'
      },
      {
        key: 'forPartners'
      },
      {
        key: 'sbaNearYou',
        icon: <img aria-hidden className={styles.linkIcon} src={nearYouIcon} />
      },
      {
        key: 'smallBusinessEvents',
        icon: <img aria-hidden className={styles.linkIcon} src={calendarIcon} />
      }
    ].map(({ key, icon }) => {
      const { text, url } = TRANSLATIONS[key][langCode]

      return wrapLink(
        text,
        <Link id={kebabCase(`mobile-nav ${text}`)} to={url}>
          {icon && icon}
          {text}
        </Link>
      )
    })

    return [...menuItems, ...secondaryMenuItems]
  }

  handleSearchChange(e) {
    e.preventDefault()
    this.setState({ searchValue: e.target.value })
  }

  submitSearch(e) {
    e.preventDefault()
    const uri = encodeURI(clientConfig.searchUrl + this.state.searchValue)
    document.location = uri
  }

  render() {
    const menuItems = this.createMenuItems()
    const menuMaxHeight = menuItems.length * 78
    return (
      <div>
        <div key={4} className={this.state.expanded ? styles.mobileHeaderOpen : styles.mobileHeaderClosed}>
          <MainLogo />
          <Link
            id="mobile-navigation-button"
            className={this.state.expanded ? styles.menuButtonOpen : styles.menuButtonClosed}
            onClick={e => {
              e.preventDefault()
              this.setState({
                expanded: !this.state.expanded
              })
            }}
            onKeyDown={e => {
              // TODO: Change to button
              // 13 equals to Enter and 32 equals to spacebar
              if (e.keyCode === 13 || e.keyCode === 32) {
                e.preventDefault()
                this.setState({
                  expanded: !this.state.expanded
                })
              }
            }}
          >
            <HamburgerIcon isOpen={this.state.expanded} />
          </Link>
        </div>
        <div
          key={7}
          className={styles.mainNavNew + ' ' + (this.state.expanded ? styles.mainNavNewShow : '')}
        >
          <form className={styles.mobileSearchContainerNew} onSubmit={this.submitSearch.bind(this)}>
            <div className={styles.searchIconContainerNew}>
              <img className={styles.searchIconNew} alt="Search" src={searchIcon} />
            </div>
            <input
              type="text"
              className={styles.searchInputFieldNew}
              placeholder="Search SBA.gov"
              onChange={this.handleSearchChange.bind(this)}
            />
          </form>
          <div
            className={styles.mobileNavMenuLinks}
            style={{ height: this.state.navHeight, maxHeight: menuMaxHeight }}
          >
            {menuItems}
          </div>
        </div>
      </div>
    )
  }
}

MobileNav.defaultProps = {
  additionalMenuOffset: 0,
  mainMenuData: []
}

export default MobileNav
