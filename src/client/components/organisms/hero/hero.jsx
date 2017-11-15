import React from 'react'

import styles from './hero.scss'
import { Callout } from 'molecules'

class Hero extends React.Component {
  imgStyles() {
    return {
      background: 'url(' + this.props.imageUrl + ') no-repeat center center',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%'
    }
  }

  render() {
    return (
      <div className={styles.heroContainer}>
        {this.props.imageUrl && (
          <div className="hero">
            <div className={styles.heroMobileImageContainer}>
              <div
                className="hero-image-mobile"
                title={this.props.alt}
                style={this.imgStyles()}
              />
            </div>
            <img
              className={`hero-image-desktop ${styles.heroDesktopImage}`}
              src={this.props.imageUrl}
              alt={this.props.alt}
            />
            <div className={`hero-callout ${styles.callout}`}>
              <Callout
                title={this.props.title}
                message={this.props.message}
                buttons={this.props.buttons}
              />
            </div>
          </div>
        )}
        {!this.props.imageUrl && (
          <div className={`hero-noimage ${styles.inHeroWithNoImage}`}>
            <div className={`hero-callout ${styles.calloutContainer}`}>
              <Callout
                inHeroWithNoImage={true}
                title={this.props.title}
                message={this.props.message}
                buttons={this.props.buttons}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Hero
