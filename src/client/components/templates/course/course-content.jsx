import React, { PropTypes, PureComponent } from 'react'
import isMobile from 'ismobilejs'

import styles from './course-content.scss'
import { Button } from 'atoms'
import { ReadMore } from 'molecules'
import { logEvent } from '../../../services/analytics'
import { eventCategories } from '../../../services/constants'

const Overlay = ({ isStarted, onClick }) => {
  const buttonText = 'Start course'

  const renderOverlay = child => (
    <div className={`course-overlay ${styles.courseOverlay}`} onClick={isMobile.any ? null : onClick}>
      {child}
    </div>
  )

  if (isMobile.any) {
    return renderOverlay(<h2>This course is not supported on mobile devices.</h2>)
  } else {
    if (!isStarted) {
      return renderOverlay(
        <Button aria-label={buttonText} primary>
          {buttonText}
        </Button>
      )
    }

    return null
  }
}

class CourseContent extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isStarted: false,
      // load iframe with an empty source
      src: ''
    }
  }

  render() {
    const { onToggleStatus, readMoreExpanded, readMoreSectionItem } = this.props

    const { isStarted, src } = this.state

    return (
      <div id="course-content" className={styles.courseContent + ' course'}>
        <div className={styles.courseEmbed}>
          <Overlay isStarted={isStarted} onClick={this.onClick.bind(this)} />
          <iframe className={styles.iframe} src={src} allowFullScreen frameBorder="0" />
        </div>
        <div className={styles.transcriptBox + ' transcript-box'}>
          <ReadMore
            parentId="01-read-more"
            onToggleStatus={onToggleStatus}
            expanded={readMoreExpanded}
            readMoreSectionItem={readMoreSectionItem}
            isHTML={true}
          />
        </div>
      </div>
    )
  }

  onClick() {
    const {
      course: { url },
      title
    } = this.props

    logEvent({
      category: eventCategories.learningCenter,
      action: `Course Begin`,
      label: title
    })

    this.setState({
      isStarted: true,
      src: url
    })
  }
}

CourseContent.propTypes = {
  onToggleStatus: PropTypes.func,
  readMoreExpanded: PropTypes.bool,
  readMoreSectionItem: PropTypes.object
}

export default CourseContent
