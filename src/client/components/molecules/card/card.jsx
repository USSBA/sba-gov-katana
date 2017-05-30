import React from "react"
import styles from "./card.scss";

class Card extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    computeCardStyle(){
        let retVal = "";
        switch(this.props.numCards){
            case 0:
            case 1:
            case 2:
                retVal = styles.twoColumn;
                break;
            case 3:
            case 5:
            case 9:
                retVal = styles.threeColumn;
                break;
            case 4:
            case 7:
            case 8:
            case 10:
            case 11:
                retVal = styles.fourColumn;
                break;
            case 12:
                retVal = styles.sixColumn;
                break;
            default:
                retVal = styles.sixColumn;
                break;
        }
        return retVal;
    }

    render() {
        let cardStyle = this.computeCardStyle();
        return (
            <div id={"card-" + this.props.index} className={cardStyle}>
                {this.props.item.image && this.props.item.image.url
                    ? <img id={"image-" + this.props.index} className={styles.itemImage} src={this.props.item.image.url} alt={this.props.item.image.alt}/>
                    : null}
                {this.props.item.titleText
                    ? <p id={"title-" + this.props.index} className={styles.itemTitle}>{this.props.item.titleText}</p>
                    : null}
                <hr id={"hr-" + this.props.index} className={styles.itemHr} />
                {this.props.item.subtitleText
                    ? <p id={"subtitle-text-" + this.props.index} className={styles.itemSubTitle}>{this.props.item.subtitleText}</p>
                    : null}
            </div>
        );
    }
}

Card.propTypes = {
    item: React.PropTypes.object,
    index: React.PropTypes.number,
    numCards: React.PropTypes.number
};

Card.defaultProps = {
    item: {},
    index: -1,
    numCards: -1
};
export default Card;