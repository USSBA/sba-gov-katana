import React from "react";
import styles from "./disaster-alert.scss";
import exitIcon from "../../../../../../public/assets/svg/exit-modal-close.svg";

class DisasterAlerts extends React.Component {

  render() {
      console.log("this.props", this.props);
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
                    <a href={this.props.link} title={this.props.buttonText} className={styles.alertButton}>{this.props.buttonText}</a>
                </div>
              </div>
            </div>
          : null}
      </div>
    )
  }
}

DisasterAlerts.defaultProps ={
    visible: false,
    link: "",
    buttonText: "",
    description: ""
}

export default DisasterAlerts;
