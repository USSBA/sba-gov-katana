import React, { PropTypes } from 'react'
import { debounce } from 'lodash'

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
      backgroundImage: `url('http://brian.ussba.io${imageUrl}')`,
      height: imageUrl && `calc(100vh - ${imageHeight}px)`,
      marginBottom: imageUrl && isSmallOnly && `${calloutHeight * 0.75}px`
    }

    return (
      <div className={`hero ${styles.hero}`}>
        <div aria-label={alt} className={imageUrl ? styles.image : styles.noImage} style={style}>
          <div className={styles.callout} ref={ref => (this.callout = ref)}>
            <h1>{title}</h1>
            <h5>{message}</h5>
            {buttons &&
              buttons.map((item, index) => (
                <Button
                  key={index}
                  primary={index === 0}
                  secondary={index > 0}
                  spacing={!imageUrl}
                  url={item.url}
                >
                  {item.btnText}
                </Button>
              ))}
          </div>
        </div>
        {imageUrl && <img className={styles.arrow} ref={ref => (this.arrow = ref)} src={scrollIcon} />}
      </div>
    )
  }

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
}

export default Hero
