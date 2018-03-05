import React from 'react'

import styles from './front-page-hero.scss'
import Triangle from 'assets/images/homepage/primary-landing/desktop-corner-graphic.png'
import { LargeInversePrimaryButton } from 'atoms'
import { eventCategories } from '../../../../services/constants'

class FrontPageHero extends React.Component {
  render() {
    const { caption, imageLarge, imageMedium, imageSmall, title } = this.props.hero
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img alt={imageLarge.alt} className={styles.heroLarge} src={imageLarge.url} />
          <img alt={imageMedium.alt} className={styles.heroMedium} src={imageMedium.url} />
          <img alt={imageSmall.alt} className={styles.heroSmall} src={imageSmall.url} />
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{caption}</div>
            <LargeInversePrimaryButton
              id="frontpage-hero-button"
              eventConfig={{
                category: [eventCategories.frontPage, 'Hero'].join('-'),
                action: `Click: ${this.props.button.title}`
              }}
              text={this.props.button.title}
              url={this.props.button.url}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FrontPageHero
