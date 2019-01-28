import React from 'react'

import styles from './style-gray-background.scss'
import * as paragraphMapper from '../../templates/paragraph-mapper.jsx'
import { CardCollection } from 'organisms'

// TODO: is using pararapher mapper here the right abstraction for code re-use?
// should probably just use a render prop
class StyleGrayBackground extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  makeParagraphs(paragraphData) {
    const paragraphList = paragraphMapper.makeParagraphs(
      paragraphData,
      index => 'gray-section-header-' + index
    )
    const wrapperClassMapping = {
      other: styles.textSection,
      textSection: styles.textSection,
      sectionHeader: styles.sectionHeader,
      cardCollection: styles.cardCollection
    }
    const wrapped = paragraphMapper.wrapParagraphs(paragraphList, wrapperClassMapping)
    return wrapped
  }

  render() {
    const paragraphs = this.makeParagraphs(this.props.paragraphs)

    return <div className={styles.greyParagraph}>{paragraphs}</div>
  }
}

StyleGrayBackground.propTypes = {
  parentIndex: React.PropTypes.number
}

StyleGrayBackground.defaultProps = {
  parentIndex: -1
}

export default StyleGrayBackground
