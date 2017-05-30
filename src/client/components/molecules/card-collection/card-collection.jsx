import React from "react"
import styles from "./card-collection.scss";
import _ from "lodash";
import Card from "../../molecules/card/card.jsx";

let cardsPerRowMap = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 3,
    "6": 6,
    "7": 4,
    "8": 4,
    "9": 3,
    "10": 4,
    "11": 4,
    "12": 6
}

class CardCollection extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        let numCards = _.size(this.props.cards);
        let cards = this.props.cards.map(function(item, index) {
            return (
                <Card key={index} item={item} index={index} numCards={numCards} />
            );
        });
        let cardsPerRow = cardsPerRowMap[cards.length];
        let rows = _.chunk(cards, cardsPerRow);
        return (
            <div className={styles.cardCollection}>
                {rows.map(function(item, index){
                    return (<div id={"card-row-" + index} key={index} className={styles.cardRow}>{item}</div>);
                })}
            </div>
        )
    }
}

CardCollection.propTypes = {
    cards: React.PropTypes.array
};

CardCollection.defaultProps = {
    cards: []
};
export default CardCollection;
