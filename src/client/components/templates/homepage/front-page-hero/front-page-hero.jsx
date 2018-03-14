import React from 'react'

import styles from './front-page-hero.scss'
import Triangle from 'assets/images/homepage/primary-landing/desktop-corner-graphic.png'
import { LargeInversePrimaryButton } from 'atoms'
import { eventCategories } from '../../../../services/constants'

class FrontPageHero extends React.Component {
  render() {
    const { button, hero: { caption, imageLarge, imageMedium, imageSmall, title } } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            alt={imageLarge.alt}
            className={styles.heroLarge}
            src={'http://kevin.sba.fun' + imageLarge.url}
          />
          <img
            alt={imageMedium.alt}
            className={styles.heroMedium}
            src={'http://kevin.sba.fun' + imageMedium.url}
          />
          <img
            alt={imageSmall.alt}
            className={styles.heroSmall}
            src={'http://kevin.sba.fun' + imageSmall.url}
          />
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <h1 className={styles.title}>{title}</h1>
            {/* <div className={styles.title}>{title}</div> */}
            <div className={styles.text}>{caption}</div>
            <LargeInversePrimaryButton
              id="frontpage-hero-button"
              eventConfig={{
                category: [eventCategories.frontPage, 'Hero'].join('-'),
                action: `Click: ${button.title}`
              }}
              text={button.title}
              url={button.url}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FrontPageHero
