import React from 'react';
import styles from '../../styles/lender-match/progress-bar.scss';



export class ProgressBar extends React.Component {
  constructor(props) {
    super();
    console.log(props)
  }

  calcProgress() {
    console.log((this.props.locationIndex / this.props.pages) * 100 + "%");
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