import React from 'react'
import _ from 'lodash'
import styles from './call-to-action.scss'

import cornerGraphicLarge from './corner-graphic-large.png'
import cornerGraphicSmall from './corner-graphic-small.png'
import { Button, DecorativeDash } from 'atoms'
import { createCtaNavigation } from '../../../services/navigation'

export class CallToAction extends React.Component {
  getCssClassNameBySize() {
    const size = this.props.size ? this.props.size.toLowerCase() : ''
    let css = {}

    if (size === 'button only') {
      css = styles.btnOnly
    } else {
      css = styles[size] || null
    }

    return css
  }

  backgroundImageStyles() {
    return {
      background: 'url(' + this.props.image + ') no-repeat center center',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%'
    }
  }

  createOnClick() {
    return createCtaNavigation(this.props.btnUrl, this.props.title, this.props.size, 1)
  }

  render() {
    const { blurb, btnTitle, btnUrl, imageAlt, headline } = this.props
    return (
      <div className={this.getCssClassNameBySize()}>
        <div id="call-to-action" className={styles.ctaContainer}>
          <div className={styles.image}>
            <div title={imageAlt} style={this.backgroundImageStyles()} />
          </div>
          <div className={styles.contentContainer}>
            <h3 className={styles.headline}>{headline}</h3>
            <DecorativeDash width="2" />
            <p className={styles.blurb}>{this.props.blurb}</p>
            <Button primary alternate url={btnUrl}>
              {btnTitle}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default CallToAction
