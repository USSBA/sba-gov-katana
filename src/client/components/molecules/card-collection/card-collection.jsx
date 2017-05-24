import React from "react"
import styles from "./card-collection.scss";
import _ from "lodash";
import Card from "../../molecules/card/card.jsx";

class CardCollection extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        let numCards = _.size(this.props.cards);
        return (
            <div className={styles.cardCollection}>
                {this.props.cards.map(function(item, index) {
                    return (
                        <Card key={index} item={item} index={index} numCards={numCards} />
                    );
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