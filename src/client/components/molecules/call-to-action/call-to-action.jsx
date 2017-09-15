import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  SmallInversePrimaryButton,
  SmallInverseSecondaryButton,
  LargePrimaryButton
} from "atoms";
import * as NavigationActions from "../../../actions/navigation.js";
import styles from "./call-to-action.scss";
import cornerGraphicLarge from "./corner-graphic-large.png";
import cornerGraphicSmall from "./corner-graphic-small.png";
import {createCtaNavigation} from "../../../services/navigation";

export class CallToAction extends React.Component {

  ctaSize() {

    const size = this.props.size ? this.props.size.toLowerCase() : "";
    let css = {};

    if (size === "button only") {
      css = styles.btnOnly;
    } else {
      css = styles[size] || null;
    }

    return css;

  }

  backgroundImageStyles() {
    return {
      "background": "url(" + this.props.image + ") no-repeat center center",
      "backgroundSize": "cover",
      "width": "100%",
      "height": "100%"
    };
  }

  render() {
    const secondaryButtonProps = {
      className: styles.btnSecondary,
      text: this.props.btnTitle,
      url: this.props.btnUrl
    };
    const secondaryButton = this.props.size === "Button only"
      ? <LargePrimaryButton {...secondaryButtonProps}/>
      : <SmallInverseSecondaryButton {...secondaryButtonProps}/>;
    return (
      <div className={this.ctaSize()}>
        <div id="call-to-action" className={styles.ctaContainer}>
          <div className={styles.image}>
            <div title={this.props.imageAlt} style={this.backgroundImageStyles()}></div>
          </div>
          <div className={styles.contentContainer}>
            <h4 className={styles.headline}>{this.props.headline}</h4>
            <p className={styles.blurb}>{this.props.blurb}</p>
            <SmallInversePrimaryButton className={styles.btn} text={this.props.btnTitle}
                                       onClick={createCtaNavigation(this.props.btnUrl, this.props.title, this.props.size, 1)}/>
          </div>
          <img className={styles.cornerGraphicLarge} src={cornerGraphicLarge} alt=""/>
          <img className={styles.cornerGraphicSmall} src={cornerGraphicSmall} alt=""/>
        </div>
        {secondaryButton}
      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NavigationActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CallToAction);
