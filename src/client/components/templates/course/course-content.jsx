import React, { PropTypes, PureComponent } from 'react'

import styles from './course-content.scss'
import { LargePrimaryButton } from 'atoms'
import { ReadMore } from 'molecules'
import { logEvent } from '../../../services/analytics'
import { eventCategories } from '../../../services/constants'

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
    const buttonText = 'Start course'

    return (
      <div id="course-content" className={styles.courseContent + ' course'}>
        <div className={styles.courseEmbed}>
          {!isStarted ? (
            <div className={`course-overlay ${styles.courseOverlay}`} onClick={this.onClick.bind(this)}>
              <LargePrimaryButton text={buttonText} url="javascript:;" ariaLabel={buttonText} />
            </div>
          ) : null}
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
    const { course: { url }, title } = this.props

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
