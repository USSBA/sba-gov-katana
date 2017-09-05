import React from "react"
import styles from "./link-card.scss";

class LinkCard extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className={"link-card " +styles.card}>
        {this.props.link
          ? <a className={"link-card-link "+styles.itemLink} href={this.props.link}>{this.props.title}
              <i className="fa fa-external-link-square" aria-hidden="true"></i>
            </a>
          : null}
        {this.props.streetAddress
          ? <div className={"link-card-streetAddress "+styles.itemData}>{this.props.streetAddress}</div>
          : null}
        {this.props.city && this.props.state && this.props.zipCode
          ? <div className={"link-card-citystatezip "+styles.itemData}>{this.props.city}, {this.props.state}{" "}{this.props.zipCode}</div>
          : null}
      </div>
    );
  }
}

LinkCard.propTypes = {
  title: React.PropTypes.string,
  streetAddress: React.PropTypes.string,
  city: React.PropTypes.string,
  state: React.PropTypes.string,
  zipCode: React.PropTypes.number,
  link: React.PropTypes.string
};
LinkCard.defaultProps = {
  title: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: null,
  link: ""
};
export default LinkCard;
