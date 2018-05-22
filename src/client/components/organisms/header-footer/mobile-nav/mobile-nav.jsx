import React from 'react'
import { HamburgerIcon, Link, MainLogo, SectionLink } from 'atoms'

import clientConfig from '../../../../services/client-config.js'
import searchIcon from 'assets/svg/mobile-menu/search-icon.svg'
import nearyouIcon from 'assets/svg/mobile-menu/near-you-icon.svg'
import calendarIcon from 'assets/svg/mobile-menu/calendar-icon.svg'
import styles from './mobile-nav.scss'

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
    let menuItems = []
    const me = this
    if (this.props.mainMenuData) {
      menuItems = this.props.mainMenuData.map((item, index) => {
        return (
          <div key={index} className={'mobile-nav-menu-item ' + styles.mobileNavMenuLink}>
            <SectionLink id={'main-menu-link-' + index} url={item.link} text={item.linkTitle} />
          </div>
        )
      })
    } else {
      menuItems.push(<div key={1} />)
    }

    const baseLength = this.props.mainMenuData ? this.props.mainMenuData.length : 2
    if (clientConfig.forPartners) {
      menuItems.push(
        <div key={baseLength + 1} className={'mobile-nav-menu-item ' + styles.mobileNavMenuLink}>
          <a className={styles.navLinkSpecialNew} href="/partners">
            For Partners
          </a>
        </div>
      )
    }
    menuItems.push(
      <div key={baseLength + 2} className={'mobile-nav-menu-item ' + styles.mobileNavMenuLink}>
        <a
          id="mobile-nav-near-you"
          className={styles.navLinkSpecialNew}
          href="/tools/local-assistance#locations-page"
        >
          <img className={styles.linkIcon} src={nearyouIcon} alt="" />
          SBA Near You
        </a>
      </div>
    )
    menuItems.push(
      <div key={baseLength + 3} className={'mobile-nav-menu-item ' + styles.mobileNavMenuLink}>
        <a id="mobile-nav-events" className={styles.navLinkSpecialNew} href="/tools/events#events-page">
          <img className={styles.linkIcon} src={calendarIcon} alt="" />
          Small Business Events
        </a>
      </div>
    )
    return menuItems
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
