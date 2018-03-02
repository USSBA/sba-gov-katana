import React from 'react'

import styles from './front-page-hero.scss'
import Triangle from 'assets/images/homepage/primary-landing/desktop-corner-graphic.png'
import { LargeInversePrimaryButton } from 'atoms'
import { eventCategories } from '../../../../services/constants'

import homepageProps from './homepageProps'
import homepageProps2 from './homepageProps2'

class FrontPageHero extends React.Component {
  render() {
    const buttonText = homepageProps.field_button[0].title
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            alt={homepageProps2.field_hero_image_large[0].alt}
            className={styles.heroLarge}
            src={homepageProps2.field_hero_image_large[0].url}
          />
          <img
            alt={homepageProps2.field_hero_image_medium[0].alt}
            className={styles.heroMedium}
            src={homepageProps2.field_hero_image_medium[0].url}
          />
          <img
            alt={homepageProps2.field_hero_image_small[0].alt}
            className={styles.heroSmall}
            src={homepageProps2.field_hero_image_small[0].url}
          />
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <div className={styles.title}>{homepageProps2.field_hero_title[0].value}</div>
            <div className={styles.text}>{homepageProps2.field_hero_caption[0].value}</div>
            <LargeInversePrimaryButton
              id="hero-button"
              eventConfig={{
                category: [eventCategories.frontPage, 'Hero'].join('-'),
                action: `Click: ${buttonText}`
              }}
              text={buttonText}
              url={homepageProps.field_button[0].uri}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FrontPageHero
