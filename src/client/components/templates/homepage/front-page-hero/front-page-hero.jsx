import React from 'react'

import styles from './front-page-hero.scss'
import Triangle from 'assets/images/homepage/primary-landing/desktop-corner-graphic.png'
import { Button } from 'atoms'
import { eventCategories } from '../../../../services/constants'

class FrontPageHero extends React.Component {
  render() {
    const { button, hero: { caption, imageLarge, imageMedium, imageSmall, title } } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img alt={imageLarge.alt} className={styles.heroLarge} src={imageLarge.url} />
          <img alt={imageMedium.alt} className={styles.heroMedium} src={imageMedium.url} />
          <img alt={imageSmall.alt} className={styles.heroSmall} src={imageSmall.url} />
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.text}>{caption}</div>
            <Button primary url={button.url}>
              {button.title}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default FrontPageHero
