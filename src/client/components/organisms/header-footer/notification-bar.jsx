import React from "react";
import styles from "./notification-bar.scss";
import exitIcon from "../../../../../public/assets/svg/exit-modal-close-white.svg";

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
					
						<a
							href={this.props.url}
							title="Learn More"
							className={styles.alertButton}>
							LEARN MORE
						</a>
					
					</div>
				
				</div>

            </div>

		);
	}

}

export default NotificationBar;
