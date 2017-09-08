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

		const renderedCards = this.props.cards.map(this.renderCard.bind(this));

		return (
			<div>
				<div className={styles.cardCollection}>
					{renderedCards}
					<hr />
				</div>
			</div>
		);
	}

}

const defaultCardsData = [{
    "title": "Test Title A",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Test Title B",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Test Title C",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Test Title D",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Test Title E",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Test Title F",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
}];

ProgramDetailsCardCollection.defaultProps = {
	"cards": defaultCardsData
};

export default ProgramDetailsCardCollection;
