import React from 'react'

import diagonalLines from 'assets/images/homepage/diagonal-lines.png'
import diagonalLinesMobile from 'assets/images/homepage/diagonal-lines-mobile.png'
import styles from './numbered-callout-block.scss'
import { Button } from 'atoms'

class NumberedCalloutBlock extends React.Component {
  render() {
    // TODO: rename
    const { link, index, solidBox, text, title } = this.props
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
          {/* TODO: clean up */}
          {solidBox ? (
            <Button primary id={'large-inverse-primary-btn-' + index} url={link}>
              Learn more
            </Button>
          ) : (
            <Button secondary id={'large-secondary-btn-' + index} url={link}>
              Learn more
            </Button>
          )}
          {solidBox ? <div /> : ''}
        </div>
      </div>
    )
  }
}

NumberedCalloutBlock.propTypes = {
  solidBox: React.PropTypes.bool,
  sectionNum: React.PropTypes.number,
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  link: React.PropTypes.string,
  index: React.PropTypes.number
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
