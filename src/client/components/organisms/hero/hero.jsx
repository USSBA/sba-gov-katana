import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { debounce } from 'lodash'

import scrollIcon from 'assets/svg/scroll.svg'
import styles from './hero.scss'
import { Callout } from 'molecules'

class Hero extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      disasterAlertHeight: 0,
      navHeight: 0,
      heroScrollHeight: 0
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResizeDebounced)
    this.onResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeDebounced)
  }

  render() {
    const { alt, buttons, imageUrl, message, title } = this.props
    const { disasterAlertHeight, navHeight, heroScrollHeight } = this.state

    const className = classNames({
      [styles.hero]: true,
      [styles.dark]: !imageUrl
    })

    return (
      <div>
        <div className={className}>
          {imageUrl ? (
            <div>
              <div
                aria-label={alt}
                className={styles.image}
                title={alt}
                style={{
                  backgroundImage: `url('${imageUrl}')`,
                  height: `calc(100vh - (${disasterAlertHeight}px + ${navHeight}px + ${
                    heroScrollHeight
                  }px))`
                }}
              >
                <div className={`hero-callout ${styles.callout}`}>
                  <Callout title={title} message={message} buttons={buttons} />
                </div>
              </div>
            </div>
          ) : (
            <div className={`hero-noimage ${styles.inHeroWithNoImage}`}>
              <div className={`hero-callout ${styles.calloutContainer}`}>
                <Callout inHeroWithNoImage={true} title={title} message={message} buttons={buttons} />
              </div>
            </div>
          )}
        </div>
        {imageUrl && <img className={styles.scroll} id="hero-scroll" src={scrollIcon} />}
      </div>
    )
  }

  onResize = () => {
    const disasterAlert = document.getElementById('disaster-alert')
    const nav = document.getElementById('nav')
    const heroScroll = document.getElementById('hero-scroll')

    this.setState({
      disasterAlertHeight: disasterAlert && disasterAlert.clientHeight,
      navHeight: nav && nav.clientHeight,
      heroScrollHeight: heroScroll && heroScroll.clientHeight
    })
  }

  onResizeDebounced = debounce(this.onResize, 500)
}

export default Hero
