import React from 'react'
import ReactDOM from 'react-dom'
import { map, indexOf } from 'lodash'
import styles from './main-menu.scss'
import { SubMenu } from 'organisms'

class MainMenu extends React.Component {
  constructor(props) {
    super()
    this.state = {
      currentlyFocusedTopLevelMenu: -1
    }
  }

  handleFocus(menuId) {
    this.setState({ currentlyFocusedTopLevelMenu: menuId })
  }

  handleSkipToNext(menuId, event) {
    const nextAnchor =
      event.target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.firstChild.firstChild
    this.setState(
      {
        currentlyFocusedTopLevelMenu: menuId + 1
      },
      function() {
        nextAnchor.focus()
      }
    )
  }

  handleTitleMouseOver(menuId, event) {
    this.setState({ currentlyFocusedTopLevelMenu: menuId })
  }

  onMenuMouseOut(menuId, event) {
    this.setState({ currentlyFocusedTopLevelMenu: -1 })
  }

  handleFinalBlur() {
    this.setState({ currentlyFocusedTopLevelMenu: -1 })
  }

  handleKeyDown(event) {
    const code = event.keyCode ? event.keyCode : event.which
    if (code === 9 && event.shiftKey) {
      if (this.state.currentlyFocusedTopLevelMenu === 0) {
        this.setState({ currentlyFocusedTopLevelMenu: -1 })
      }
    }
  }

  determineActiveSection(data) {
    const topLevelPaths = map(data, item => item.link.replace('/', ''))
    const path = window.location.pathname
    const split = path.split('/')
    const sectionName = split && split.length > 0 ? split[1] : ''
    return indexOf(topLevelPaths, sectionName)
  }

  render() {
    let menuItems = []
    if (this.props.data) {
      const activeIndex = this.determineActiveSection(this.props.data)
      menuItems = this.props.data.map((item, index) => {
        const submenuProps = {
          id: 'sub-menu-' + index,
          key: index,
          shown: index === this.state.currentlyFocusedTopLevelMenu,
          data: item,
          onFocus: event => this.handleFocus(event),
          menuId: index,
          onTitleMouseOver: event => this.handleTitleMouseOver(index, event),
          onMenuMouseOut: event => this.onMenuMouseOut(index, event),
          onSkipToNext: event => this.handleSkipToNext(index, event),
          hasNext: index !== this.props.data.length - 1,
          onFinalBlur: event => this.handleFinalBlur(event),
          autoFocusOnTitle: index === this.state.currentlyFocusedTopLevelMenu,
          onSectionLinkKeyDown: event => this.handleKeyDown(event),
          showUnderline: index === activeIndex
        }
        return <SubMenu {...submenuProps} />
      })
    } else {
      menuItems.push(<div key={1} />)
    }
    // the onClick below will hide the menu when anything is clicked
    return (
      <div
        id="main-menu"
        role="menubar"
        aria-label="main navigation bar with dropdown submenus"
        className={styles.mainMenu}
        onClick={() => {
          this.onMenuMouseOut()
        }}
      >
        <ul>{menuItems}</ul>
      </div>
    )
  }
}
export default MainMenu
