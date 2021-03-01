import React from 'react'
import { debounce, isEmpty } from 'lodash'

import scrollIcon from 'assets/svg/scroll.svg'
import styles from './hero.scss'
import { Button } from 'atoms'

class Hero extends React.Component {
  constructor(props) {
    super(props)

    // TODO: This should be moved to redux state so that other components can
    // use it.
    this.state = {
      calloutHeight: 0,
      imageHeight: 0,
      isSmallOnly: false
    }
  }

  componentDidMount() {
    // Force the resize on page load (without a delay).
    this.onResize()

    window.addEventListener('resize', this.onResizeDebounced)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeDebounced)
  }

  render() {
    const { alt, buttons, imageUrl, message, title } = this.props
    const { calloutHeight, imageHeight, isSmallOnly } = this.state

    const style = {
      // We use a background image to take advantage of `background-size: cover`.
      backgroundImage: imageUrl && `url('${imageUrl}')`,
      height: imageUrl && `calc(100vh - ${imageHeight}px)`,
      marginBottom: imageUrl && isSmallOnly && `${calloutHeight * 0.75}px`
    }

    return (
      <div data-testid="hero" className={`hero ${styles.hero}`}>
        <div
          data-testid="background"
          aria-label={alt}
          className={imageUrl ? styles.image : styles.noImage}
          style={style}
          alt={alt}
        >
          <div className={styles.callout} ref={ref => (this.callout = ref)}>
            <h1 tabIndex="0" data-testid="title">
              {title}
            </h1>
            {!isEmpty(message) && (
              <h2 className={styles.message} tabIndex="0" data-testid="message">
                {message}
              </h2>
            )}
            {buttons &&
              buttons.map((item, index) => (
                <Button
                  key={index}
                  primary={index === 0}
                  secondary={index > 0}
                  spacing={!imageUrl}
                  url={item.url}
                  data-testid="button"
                >
                  {typeof message === 'string' && (
                    <span className={styles.accessibilityText}>{message}</span>
                  )}
                  {item.btnText}
                </Button>
              ))}
          </div>
        </div>
        {imageUrl && (
          <img
            className={styles.arrow}
            data-testid="hero-arrow"
            aria-hidden="true"
            alt=""
            ref={ref => (this.arrow = ref)}
            src={scrollIcon}
          />
        )}
      </div>
    )
  }

  /* eslint-disable no-invalid-this */
  onResize = () => {
    const arrow = this.arrow
    const callout = this.callout
    const disasterAlert = document.getElementById('disaster-alert')
    const nav = document.getElementById('nav')

    this.setState({
      calloutHeight: callout && callout.clientHeight,
      imageHeight:
        (disasterAlert && disasterAlert.clientHeight) +
        (nav && nav.clientHeight) +
        (arrow && arrow.clientHeight),
      isSmallOnly: window && window.matchMedia(`(max-width: ${styles.breakpointMedium})`).matches
    })
  }

  // Debounce onResize() before hooking onto event listeners for performance.
  onResizeDebounced = debounce(this.onResize, 250)
  /* eslint-enable no-invalid-this */
}

export default Hero
