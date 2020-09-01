/* eslint-disable no-invalid-this */

import React, { Component } from 'react'
import styles from './back-to-top-button.module.scss'
import classNames from 'classnames'

class BackToTopButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: false
    }
  }
  componentDidMount() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(min-width: 768px)')
      mediaQuery.addListener(this.widthChange)
      this.widthChange(mediaQuery)
      window.addEventListener('scroll', this.handleScroll)
      this.shouldUpdate = true
      this.newsletterButton = document.querySelector('.newsletter .button')
      this.update()
    }
  }
  update() {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const SCROLL_THRESHOLD = viewportHeight * 1.5
    const enabled = window.scrollY > SCROLL_THRESHOLD
    const bottomMargin = viewportHeight - this.newsletterButton.getBoundingClientRect().y
    this.setState({ enabled, bottomMargin })
    this.ticking = false
  }
  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => {
        if (this.shouldUpdate) {
          this.update()
        }
      })
    }
  }
  componentWillUnmount() {
    this.shouldUpdate = false
  }
  resetYPos() {
    window.scrollTo(0, 0)
  }
  widthChange(mediaQuery) {
    const isDesktopBreakpoint = mediaQuery.matches
    this.setState({ isDesktopBreakpoint })
  }
  render() {
    const { enabled, bottomMargin, isDesktopBreakpoint } = this.state
    const className = classNames({
      [styles.backToTopButton]: true,
      [styles.disabled]: !enabled
    })
    let bottomMarginStyle = {}
    if (bottomMargin > 8 && isDesktopBreakpoint) {
      const EXTRA_MARGIN = 22
      bottomMarginStyle = {
        style: {
          bottom: `${Math.ceil(bottomMargin + EXTRA_MARGIN)}px`
        }
      }
    }
    return (
      <button
        data-testid="back-to-top-button"
        className={className}
        onClick={e => {
          e.preventDefault()
          this.resetYPos()
        }}
        {...bottomMarginStyle}
      >
        <span data-testid="arrow" className={styles.arrow} />
        <strong>Back to Top</strong>
      </button>
    )
  }
}
export default BackToTopButton
