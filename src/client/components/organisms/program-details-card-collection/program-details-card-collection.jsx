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

		const {cards} = this.props;
		
		return (
			<div>
				{ cards !== null && 
				<div className={styles.cardCollection}>
					{cards.map(this.renderCard.bind(this))}
					<hr />
				</div>}
			</div>
		);
	}

}

const defaultCardsData = [{
    "title": "Title A",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Title B",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Title C",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Title D",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Title E",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
},{
    "title": "Title F",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
}];

ProgramDetailsCardCollection.defaultProps = {
	"cards": defaultCardsData
};

export default ProgramDetailsCardCollection;
