import React from 'react'
import s from './long-scroll-nav.scss'
import { getLanguageOverride } from '../../../services/utils'
import { TRANSLATIONS } from '../../../translations'

class LongScrollNav extends React.Component {
  renderStep(index) {
    if (this.props.section == index) {
      return (
        <div className={s.sectionCircleContainer}>
          <div className={s.activeCircle}>
            <span className={s.sectionNum}>{index + 1}</span>
          </div>
        </div>
      )
    } else {
      return <div className={this.props.navType === 'center' ? s.circleNegative : s.circle} />
    }
  }

  handleAnchorClick(index) {
    document.location.href = '#step-' + index + 1
  }

  render() {
    // Store either 'en' or 'es' as langCode
    const langCode = getLanguageOverride(true).substring(0, 2)
    console.log(langCode)
    // Storing order of 10 steps as an array 10
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
    console.log(stepArray)
    const steps = []
    // Replace stepArray values with appropriate translations
    for (let i = 0; i < stepArray.length; i++) {
      // Using the stepArray to do an in-place replacement
      stepArray[i] = TRANSLATIONS[stepArray[i]][langCode].text
      // 1st entry resolves to TRANSLATIONS[research.es.text]
      // Cast as object with property title and store in steps[i]
      steps[i] = { title: stepArray[i] }
    }
    console.log(steps)

    // ES2015 Replacement Version
    // let steps = stepArray.map(item => TRANSLATIONS[item][langCode].text)

    // Old code to be replaced
    // const steps = [
    //   {
    //     title: stepArray[0]
    //   },
    //   {
    //     title: stepArray[1]
    //   },
    //   {
    //     title: stepArray[2]
    //   },
    //   {
    //     title: stepArray[3]
    //   },
    //   {
    //     title: stepArray[4]
    //   },
    //   {
    //     title: stepArray[5]
    //   },
    //   {
    //     title: stepArray[6]
    //   },
    //   {
    //     title: stepArray[7]
    //   },
    //   {
    //     title: stepArray[8]
    //   },
    //   {
    //     title: stepArray[9]
    //   }

    // const steps = [
    //   {
    //     title: 'Research'
    //   },
    //   {
    //     title: 'Plan'
    //   },
    //   {
    //     title: 'Fund'
    //   },
    //   {
    //     title: 'Location'
    //   },
    //   {
    //     title: 'Structure'
    //   },
    //   {
    //     title: 'Name'
    //   },
    //   {
    //     title: 'Register'
    //   },
    //   {
    //     title: 'Tax IDs'
    //   },
    //   {
    //     title: 'License'
    //   },
    //   {
    //     title: 'Banking'
    //   }
    // ]

    return (
      <div
        id="ten-steps-nav"
        aria-hidden="true"
        className={this.props.navType === 'center' ? s.containerCenter : s.containerTop}
      >
        {steps.map((step, index) => {
          return (
            <div className={s.section} key={index}>
              {this.renderStep(index)}
              <div
                className={s.hoverBox}
                onClick={() => {
                  this.handleAnchorClick(index)
                }}
              >
                <div className={s.title}>{step.title}</div>
                <div className={s.activeCircleContainer}>
                  <div className={s.activeCircle}>
                    <span className={s.sectionNum}>{index + 1}</span>
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

export default LongScrollNav
