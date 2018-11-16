import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DesktopNav from '../desktop-nav/desktop-nav.jsx'
import MobileNav from '../mobile-nav/mobile-nav.jsx'

import { fetchSiteContent } from '../../../../fetch-content-helper'

import styles from './header.scss'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      mainMenuData: null
    }
  }

  async componentDidMount() {
    const mainMenuData = await fetchSiteContent('mainMenu')
    this.setState({ mainMenuData })
  }

  render() {
    const { mainMenuData } = this.state
    return (
      <nav id="nav" className={styles.navbar}>
        <MobileNav additionalMenuOffset={this.props.additionalMenuOffset} mainMenuData={mainMenuData} />
        <DesktopNav mainMenuData={mainMenuData} />
      </nav>
    )
  }
}

Header.defaultProps = {
  additionalMenuOffset: 0
}

export default Header
