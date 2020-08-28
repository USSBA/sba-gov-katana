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
    window.addEventListener('scroll', this.handleScroll)
    this.shouldUpdate = true
    this.update()
  }
  update() {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const SCROLL_THRESHOLD = viewportHeight * 3
    const enabled = window.scrollY > SCROLL_THRESHOLD
    this.setState({ enabled })
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
  render() {
    const { enabled } = this.state
    const className = classNames({
      [styles.backToTopButton]: true,
      [styles.disabled]: !enabled
    })
    return (
      <button
        data-testid="back-to-top-button"
        className={className}
        onClick={e => {
          e.preventDefault()
          this.resetYPos()
        }}
      >
        <span data-testid="arrow" className={styles.arrow} />
        <strong>Back to Top</strong>
      </button>
    )
  }
}
export default BackToTopButton
