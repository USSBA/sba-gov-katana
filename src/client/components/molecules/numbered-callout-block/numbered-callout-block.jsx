import React from 'react'
import PropTypes from 'prop-types'

import diagonalLines from 'assets/images/homepage/diagonal-lines.png'
import diagonalLinesMobile from 'assets/images/homepage/diagonal-lines-mobile.png'
import styles from './numbered-callout-block.scss'
import { Button } from 'atoms'
import { TRANSLATIONS } from '../../../translations'
import { getLanguageOverride } from '../../../services/utils'

class NumberedCalloutBlock extends React.Component {
  render() {
    const { link, index, solidBox, text, title } = this.props
    const langCode = getLanguageOverride(true)

    return (
      <div
        id={'title-box-container-' + index}
        className={this.props.solidBox ? styles.alternateBox : styles.box}
      >
        <div id={'title-box-elements-' + index}>
          <span className={styles.number}>{this.props.sectionNum}</span>
          <h1 id={'heading2-' + index}>{title}</h1>
          <p id={'paragraph-' + index} className={styles.text}>
            {text}
          </p>
          {solidBox ? (
            <Button primary id={'large-inverse-primary-btn-' + index} url={link}>
              {TRANSLATIONS.learnMore[langCode].text}
            </Button>
          ) : (
            <Button secondary id={'large-secondary-btn-' + index} url={link}>
              {TRANSLATIONS.learnMore[langCode].text}
            </Button>
          )}
          {solidBox ? <div /> : ''}
        </div>
      </div>
    )
  }
}

NumberedCalloutBlock.propTypes = {
  solidBox: PropTypes.bool,
  sectionNum: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  index: PropTypes.number
}

NumberedCalloutBlock.defaultProps = {
  solidBox: true,
  sectionNum: 0,
  title: '',
  text: '',
  link: '',
  index: 0
}

export default NumberedCalloutBlock
