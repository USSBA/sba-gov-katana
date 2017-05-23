import React from 'react';
import styles from './disaster-alerts.scss'
import exitIcon from '../../../../../public/assets/svg/exit-modal-close.svg';

class DisasterAlerts extends React.Component {

  render() {
    return (
      <div>
        {this.props.visible
          ? <div className={styles.wrapper}>
              <div className={styles.alert}>
                <div className={styles.alertIcon + " fa fa-exclamation-triangle"} aria-hidden="true"></div>
                <div className={styles.disasterDescription}>
                  {this.props.text}
                </div>
                <img className={styles.alertClose} onClick={this.props.onClose} src={exitIcon} alt="Close"/>
                <div>
                  <a href='https://disasterloan.sba.gov/ela/' title='Apply for disaster loan' className={styles.alertButton}>APPLY FOR DISASTER LOAN</a>
                </div>
              </div>
            </div>
          : null}
      </div>
    )
  }
}

DisasterAlerts.defaultProps = {
  visible: false,
  text: ""
}

export default DisasterAlerts;
