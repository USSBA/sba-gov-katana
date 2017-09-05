import React from "react";
import styles from "./notification-bar.scss";
import exitIcon from "../../../../../public/assets/svg/exit-modal-close-white.svg";
import {BasicLink} from "atoms"

class NotificationBar extends React.Component {

	render() {
		return (

			<div className={styles.wrapper}>

				<div className={styles.alert}>

					<div className={styles.description}>
						{this.props.description}
					</div>

					<img
						className={styles.alertClose}
						onClick={this.props.onClose}
						src={exitIcon}
						alt="Close"
					/>

					<div>

						<BasicLink htmlElement="button" url={this.props.url} text="LEARN MORE" myClassName={styles.alertButton}/>
					</div>

				</div>

            </div>

		);
	}

}

NotificationBar.defaultProps = {
	description: "",
	url: "#",
	onClose: () => {
		return false;
	}
};

export default NotificationBar;
