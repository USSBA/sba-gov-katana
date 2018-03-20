import React from 'react'

import diagonalLines from 'assets/images/homepage/diagonal-lines.png'
import diagonalLinesMobile from 'assets/images/homepage/diagonal-lines-mobile.png'
import styles from './title-box.scss'
import { Button } from 'atoms'

class TitleBox extends React.Component {
  render() {
    return (
      <div
        id={'title-box-container-' + this.props.index}
        className={this.props.solidBox ? styles.solidBox : styles.transparentBox}
      >
        <div id={'title-box-elements-' + this.props.index}>
          <span id={'span-' + this.props.index} className={styles.sectionNum}>
            {this.props.sectionNum}
          </span>
          <h2 id={'heading2-' + this.props.index} className={styles.sectionTitle}>
            {this.props.title}
          </h2>
          <p id={'paragraph-' + this.props.index} className={styles.sectionText}>
            {this.props.text}
          </p>
          {/* TODO: clean up */}
          {this.props.solidBox ? (
            <Button primary id={'large-inverse-primary-btn-' + this.props.index} url={this.props.link}>
              Learn more
            </Button>
          ) : (
            <Button secondary id={'large-secondary-btn-' + this.props.index} url={this.props.link}>
              Learn more
            </Button>
          )}
          {this.props.solidBox ? <div /> : ''}
        </div>
      </div>
    )
  }
}

TitleBox.propTypes = {
  solidBox: React.PropTypes.bool,
  sectionNum: React.PropTypes.number,
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  link: React.PropTypes.string,
  index: React.PropTypes.number
}

TitleBox.defaultProps = {
  solidBox: true,
  sectionNum: 0,
  title: '',
  text: '',
  link: '',
  index: 0
}

export default TitleBox
