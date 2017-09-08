import React, {Component} from "react";
import _ from "lodash";
import {ProgramDetailsCard} from "molecules";
import styles from "./program-details-card-collection.scss";

class ProgramDetailsCardCollection extends Component {

	renderCard(item, index) {

		const {title, description, fullUrl} = item;

		return (

			<div className={styles.card} key={index}>

				<ProgramDetailsCard
					title={title}
					description={description}
					fullUrl={fullUrl}
				/>

			</div>

		);

	}

	renderRow(chunk, index) {

		return (
			<div className={styles.cardRow} key={index}>
				{chunk.map(this.renderCard.bind(this))}
			</div>
		);

	}

	renderCards() {

		const colAmount = 3;
		const chunks = _.chunk(this.props.cards, colAmount);
		return chunks.map(this.renderRow.bind(this));

	}



	render() {

		return (
			<div>
				<h3>Program Details</h3>
				<div className={styles.cardCollection}>
					{this.renderCards()}
				</div>
			</div>
		);
	}

}

const defaultCardsData = [{
    "title": "Test Title A",
    "fullUrl": "/my-path/my-page",
    "description": "Test page"
}];

ProgramDetailsCardCollection.defaultProps = {
	"cards": defaultCardsData
};

export default ProgramDetailsCardCollection;
