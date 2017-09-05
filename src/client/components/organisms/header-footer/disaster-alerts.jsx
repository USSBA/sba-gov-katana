import React from "react";
import styles from "./disaster-alerts.scss";
import exitIcon from "../../../../../public/assets/svg/exit-modal-close.svg";
import {BasicLink} from "atoms"

class DisasterAlerts extends React.Component {

  render() {
    return (
      <div>
        {this.props.visible
          ? <div className={styles.wrapper}>
              <div className={styles.alert}>
                <div className={styles.alertIcon + " fa fa-exclamation-triangle"} aria-hidden="true"></div>
                <div className={styles.disasterDescription}>
                  {this.props.description}
                </div>
                <img className={styles.alertClose} onClick={this.props.onClose} src={exitIcon} alt="Close"/>
                <div>
                    <BasicLink url='https://disasterloan.sba.gov/ela/' text='APPLY FOR DISASTER LOAN' myClassName={styles.alertButton}/>
                </div>
              </div>
            </div>
          : null}
      </div>
    )
  }
}

export default DisasterAlerts;
