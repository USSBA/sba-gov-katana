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
      navHeight: 0,
      scrollHeight: 0
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
    const { navHeight, scrollHeight } = this.state

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
                  height: `calc(100vh - (${navHeight}px + ${scrollHeight}px))`
                }}
              />
              <div className={`hero-callout ${styles.callout}`}>
                <Callout title={title} message={message} buttons={buttons} />
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
    this.setState({
      navHeight: document.getElementById('nav').clientHeight,
      scrollHeight: document.getElementById('hero-scroll').clientHeight
    })
  }

  onResizeDebounced = debounce(this.onResize, 500)
}

export default Hero
