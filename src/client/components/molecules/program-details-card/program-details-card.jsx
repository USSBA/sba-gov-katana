import React, {Component} from "react";
import {DecorativeDash} from "atoms";
import styles from "./program-details-card.scss";

class ProgramDetailsCard extends Component {
	
	render() {

		return (
			<div className={styles.container}>
				<h4>{this.props.title}</h4>
				<DecorativeDash aria-hidden="true" className={styles.decorativeDash} />
				<p>{this.props.description}</p>
				<p><a href={this.props.learnMoreUrl}>Learn More</a></p>
			</div>
		);

	}

}

ProgramDetailsCard.defaultProps = {
	"title": "Program Title",
	"description": "program description text",
	"fullUrl": "#"
};

export default ProgramDetailsCard;
