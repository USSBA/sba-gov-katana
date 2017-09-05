import React from "react"
import styles from "./contact-card.scss";
import {SmallIcon} from "../../atoms";

class ContactCard extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  renderLinkableIconWithText(index, text, style, icon, href) {
    // if the text has newlines, then split and separate by <br>
    let lines = text.split("\n");
    return (
      <div className={"contact-card-link-line "+styles.line} key={index}>
        <div className={styles.icon}>
          <SmallIcon fontAwesomeIconClassName={icon} altText={text} tabbable={false} href={href || text}/>
        </div>
        <div className={styles.text}>
          <a className={style} href={href || text} target="_blank">
            {lines.map((item, j) => {
              return (
                <span key={j}>{item}<br/></span>
              );
            })}
          </a>
        </div>
      </div>
    );
  }

  renderIconWithText(index, text, style, icon) {
    return (
      <div className={"contact-card-plain-line "+styles.line} key={index}>
        <div className={styles.icon}>
          <i alt={text} className={" fa fa-" + icon} aria-hidden="true"></i>
        </div>
        <span>
          {text}
        </span>
      </div>
    );
  }

  generateGoogleMapsLink(address) {
    return "https://maps.google.com?q=" + encodeURIComponent(address)
  }

  render() {

    let address = this.props.streetAddress && this.props.city && this.props.state && this.props.zipCode
      ? this.props.streetAddress + "\n" + this.props.city + "," + this.props.state + " " + this.props.zipCode
      : null;
    return (
      <div className={"contact-card " + styles.card}>
        {this.props.title
          ? <div key={1} className={styles.title}>{this.props.title}</div>
          : null}
        <div className={styles.container}>
          {address
            ? this.renderLinkableIconWithText(2, address, styles.address, "map-marker", this.generateGoogleMapsLink(address))
            : null}
          {this.props.phoneNumber
            ? this.renderLinkableIconWithText(3, this.props.phoneNumber, styles.phoneNumber, "phone", "tel:" + this.props.phoneNumber)
            : null}
          {this.props.fax
            ? this.renderIconWithText(4, this.props.fax, styles.fax, "fax")
            : null}
          {this.props.email
            ? this.renderLinkableIconWithText(5, this.props.email, styles.email, "envelope-o", "mailto:" + this.props.email)
            : null}
          {this.props.link
            ? this.renderLinkableIconWithText(6, "Visit website", styles.link, "external-link-square", this.props.link)
            : null}
        </div>
      </div>
    );
  }
}

ContactCard.propTypes = {
  title: React.PropTypes.string,
  streetAddress: React.PropTypes.string,
  city: React.PropTypes.string,
  state: React.PropTypes.string,
  zipCode: React.PropTypes.number,
  phoneNumber: React.PropTypes.string,
  fax: React.PropTypes.string,
  email: React.PropTypes.string,
  link: React.PropTypes.string
};
ContactCard.defaultProps = {
  title: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: 0,
  phoneNumber: "",
  fax: "",
  email: "",
  link: ""
};
export default ContactCard;
