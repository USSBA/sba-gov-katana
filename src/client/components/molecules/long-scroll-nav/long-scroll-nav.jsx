import React from 'react'
import styles from './long-scroll-nav.scss'

class LongScrollNav extends React.Component {
  renderStep(index) {
    if (this.props.section === index) {
      return (
        <div className={styles.sectionCircleContainer}>
          <div className={styles.activeCircle}>
            <span className={styles.sectionNum}>{index + 1}</span>
          </div>
        </div>
      )
    } else {
      return <div className={this.props.navType === 'center' ? styles.circleNegative : styles.circle} />
    }
  }

  handleAnchorClick(index) {
    document.location.href = '#step-' + index + 1
  }

  render() {
    const steps = [
      {
        title: 'Research'
      },
      {
        title: 'Plan'
      },
      {
        title: 'Fund'
      },
      {
        title: 'Location'
      },
      {
        title: 'Structure'
      },
      {
        title: 'Name'
      },
      {
        title: 'Register'
      },
      {
        title: 'Tax IDs'
      },
      {
        title: 'License'
      },
      {
        title: 'Banking'
      }
    ]

    return (
      <div
        id="ten-steps-nav"
        aria-hidden="true"
        className={this.props.navType === 'center' ? styles.containerCenter : styles.containerTop}
      >
        {steps.map((step, index) => (
          <div className={styles.section} key={index}>
            {this.renderStep(index)}
            <div
              className={styles.hoverBox}
              onClick={() => {
                this.handleAnchorClick(index)
              }}
            >
              <div className={styles.title}>{step.title}</div>
              <div className={styles.activeCircleContainer}>
                <div className={styles.activeCircle}>
                  <span className={styles.sectionNum}>{index + 1}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default LongScrollNav
