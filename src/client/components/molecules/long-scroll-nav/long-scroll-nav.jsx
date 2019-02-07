import React from 'react'
import PropTypes from 'prop-types'
import style from './long-scroll-nav.scss'
import { getLanguageOverride } from '../../../services/utils'
import { TRANSLATIONS } from '../../../translations'

class LongScrollNav extends React.Component {
  renderStep(index) {
    if (this.props.section === index) {
      return (
        <div className={style.sectionCircleContainer}>
          <div className={style.activeCircle}>
            <span className={style.sectionNum}>{index + 1}</span>
          </div>
        </div>
      )
    } else {
      return <div className={this.props.navType === 'center' ? style.circleNegative : style.circle} />
    }
  }

  handleAnchorClick(index) {
    document.location.href = '#step-' + index + 1
  }

  render() {
    // This section handles Spanish translation
    // Storing order of 10 steps as an array (order matters here)
    const stepArray = [
      'research',
      'plan',
      'fund',
      'location',
      'structure',
      'name',
      'register',
      'taxIDs',
      'license',
      'banking'
    ]
    // Store either 'en' or 'es' as langCode
    const langCode = getLanguageOverride()
    // Replace stepArray values with appropriate translations
    const steps = stepArray.map(step => {
      return { title: TRANSLATIONS[step][langCode].text }
    })

    return (
      <div
        id="ten-steps-nav"
        aria-hidden="true"
        className={this.props.navType === 'center' ? style.containerCenter : style.containerTop}
      >
        {steps.map((step, index) => {
          return (
            <div className={style.section} key={index}>
              {this.renderStep(index)}
              <div
                className={style.hoverBox}
                onClick={() => {
                  this.handleAnchorClick(index)
                }}
              >
                <div className={style.title}>{step.title}</div>
                <div className={style.activeCircleContainer}>
                  <div className={style.activeCircle}>
                    <span className={style.sectionNum}>{index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

LongScrollNav.propTypes = {
  // section varies from number, string and undefined
  navType: PropTypes.string
}

export default LongScrollNav
