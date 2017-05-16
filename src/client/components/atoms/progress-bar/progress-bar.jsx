import React from 'react';
import styles from './progress-bar.scss';

class ProgressBar extends React.Component {
  constructor(props) {
    super();
  }

  calcProgress() {
    return (this.props.locationIndex / this.props.pages) * 100 + "%"
  }

  render() {
    return (
      <div className={ styles.barContainer }>
        <div className={ styles.bar } style={ { width: this.calcProgress() } }></div>
      </div>
    )
  }
}

export default ProgressBar
