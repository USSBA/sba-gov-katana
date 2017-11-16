import React from 'react'

import styles from './section-link.scss'
import { BasicLink } from '../../atoms'

class SectionLink extends React.Component {
  render() {
    let underlineStyle = this.props.showUnderline ? ' ' + styles.underline : ''
    let triangleColor = this.props.enableTriangleMarker ? ' ' + styles.triangleTheme : ''
    return (
      <span
        id={this.props.id + '-container'}
        className={styles.link + underlineStyle}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >
        <BasicLink
          text={this.props.text}
          id={this.props.id}
          myClassName={styles.sectionLink}
          url={this.props.url}
          onKeyDown={this.props.onKeyDown}
        />
        <div
          className={
            styles.triangle +
            triangleColor +
            (this.props.shouldForceTriangleMarkerVisibility ? ' ' + styles.visible : '')
          }
        />
        {this.props.children}
      </span>
    )
  }
}

SectionLink.defaultProps = {
  enableTriangleMarker: false,
  shouldForceTriangleMarkerVisibility: false
}

SectionLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  enableTriangleMarker: React.PropTypes.bool,
  shouldForceTriangleMarkerVisibility: React.PropTypes.bool,
  showUnderline: React.PropTypes.bool,
  onKeyDown: React.PropTypes.func
}

export default SectionLink
