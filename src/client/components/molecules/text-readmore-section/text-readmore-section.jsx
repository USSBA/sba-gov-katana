import React from 'react'
import { reverse, debounce } from 'lodash'
import TextSection from '../text-section/text-section.jsx'
import ReadMore from '../readmore/readmore.jsx'
import styles from './text-readmore-section.scss'

class TextReadMoreSection extends React.Component {
  constructor(props) {
    super()
    this.state = {
      readMoreExpanded: false
    }
  }

  handleReadMoreStatus(readMoreStatus) {
    this.setState({ readMoreExpanded: readMoreStatus })
  }

  makeTextSection() {
    return (
      <div
        key={2}
        className={styles.textSection}
        id={this.props.parentId + '-text-section'}
      >
        <TextSection text={this.props.textSectionItem.text} />
      </div>
    )
  }

  makeReadMoreSection() {
    return (
      <div key={1} className={styles.readMoreSection}>
        <ReadMore
          parentId={this.props.parentId + '-read-more'}
          onToggleStatus={this.handleReadMoreStatus.bind(this)}
          expanded={this.state.readMoreExpanded}
          readMoreSectionItem={this.props.readMoreSectionItem}
        />
      </div>
    )
  }

  /** The order of the components depends on both the expanded state and if the viewer agent is mobile or not
   *  On desktop the order is reversed when expanded; on mobile it remains the same.  As such the render method below
   *  uses the viewport width to determine when to reverse the order and when not to; however, the render method is not always
   *  when the window is resized.  These methods will force that to ensure that the order is correct.
   *  To reproduce one of these oddities, view in Desktop in non-expanded mode and then resize into mobile size.  Notice the readmore is below
   *  the text section.  Toggle the "read more" button twice and notice that the readmore is now collapsed but before the text section.
   *  If resizing becomes slow, remove this code.
   **/
  resize = () => this.forceUpdate()

  componentDidMount() {
    window.addEventListener('resize', debounce(this.resize, 400))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
  /** End special render functions **/

  render() {
    let expandedStyle = this.state.readMoreExpanded ? styles.expanded : ''

    let subcomponents = [this.makeReadMoreSection(), this.makeTextSection()]
    if (!this.state.readMoreExpanded && window.innerWidth > 1079) {
      subcomponents = reverse(subcomponents)
    }

    return (
      <div className={expandedStyle + ' ' + styles.textReadMoreSection}>
        {subcomponents}
      </div>
    )
  }
}

TextReadMoreSection.propTypes = {
  textSectionItem: React.PropTypes.object.isRequired,
  readMoreSectionItem: React.PropTypes.object.isRequired,
  parentId: React.PropTypes.string.isRequired
}

export default TextReadMoreSection
