import React from 'react'
import Waypoint from 'react-waypoint'
import TitleBox from '../title-box/title-box.jsx'
import styles from './ten-steps-section.scss'

class TenStepsSection extends React.Component {
  calculateSectionStyle() {
    if (this.props.sectionItem.leftAlignBox) {
      return this.props.sectionItem.solidBox
        ? styles.leftAlignedHero
        : styles.leftAligned
    } else {
      return this.props.sectionItem.solidBox
        ? styles.rightAlignedHero
        : styles.rightAligned
    }
  }

  render() {
    let sectionStyle = this.calculateSectionStyle()
    return (
      <div
        id={'step-' + this.props.index + 1}
        className={sectionStyle + ' ' + styles.stepSection}
      >
        <img
          id={'section-image-' + this.props.index}
          className={styles.Banner}
          src={this.props.sectionItem.image}
          alt={this.props.sectionItem.imageAlt}
        />
        <Waypoint
          onEnter={() => {
            this.props.sectionEnter()
          }}
          onLeave={() => {
            this.props.sectionLeave()
          }}
          onPositionChange={() => {}}
        >
          <div
            id={'section-title-box-' + this.props.index}
            className={styles.titleBox}
          >
            <TitleBox
              index={this.props.index}
              solidBox={this.props.sectionItem.solidBox}
              sectionNum={this.props.sectionItem.sectionNum}
              title={this.props.sectionItem.title}
              text={this.props.sectionItem.text}
              link={this.props.sectionItem.link}
            />
          </div>
        </Waypoint>
      </div>
    )
  }
}

TenStepsSection.propTypes = {
  sectionItem: React.PropTypes.object
}

TenStepsSection.defaultProps = {
  sectionItem: {}
}

export default TenStepsSection
