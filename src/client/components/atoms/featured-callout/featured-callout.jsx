import React from 'react'
import styles from './featured-callout.scss'

class FeaturedCallout extends React.Component {
  render() {
    return (
      <div className={styles.menuCallToAction}>
        <a href={this.props.target} title={this.props.title}>
          <img
            src="assets/images/disaster.png"
            alt={this.props.text}
            title={this.props.title}
          />
          <p>{this.props.text}</p>
        </a>
      </div>
    )
  }
}

FeaturedCallout.propTypes = {
  text: React.PropTypes.string.isRequired,
  target: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired
}

export default FeaturedCallout
