import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as NavigationActions from "../../../actions/navigation.js";
import styles from './call-to-action.scss';
import SmallInversePrimaryButton from "../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx";
import SmallInverseSecondaryButton from "../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx";
import cornerGraphicLarge from './corner-graphic-large.png';
import cornerGraphicSmall from './corner-graphic-small.png';

class CallToAction extends React.Component {

    handleClick() {
      this.props.actions.callToAction(this.props.btnUrl, this.props.title, this.props.size, 1);
    }

  ctaSize() {
    if (this.props.size === "Large") {
      return styles.large
    } else if (this.props.size === "Medium") {
      return styles.medium
    } else if (this.props.size === "Small") {
      return styles.small
    } else if (this.props.size === "Button only") {
      return styles.btnOnly
    } else {
      return null
    }
  }

  backgroundImageStyles() {
    return {
      "background": "url(" + this.props.image + ") no-repeat center center",
      "backgroundSize": "cover",
      "width": "100%",
      "height": "100%"
    }
  }

  render(){
    return (
      <div className={this.ctaSize()}>
        <div id="call-to-action" className={styles.ctaContainer}>
        <div className={styles.image}>
          <div style={this.backgroundImageStyles()}></div>
        </div>
          <div className={styles.contentContainer}>
            <h4 className={styles.headline}>{this.props.headline}</h4>
            <p className={styles.blurb}>{this.props.blurb}</p>
            <SmallInversePrimaryButton className={styles.btn} text={this.props.btnTitle} onClick={() => {
              this.handleClick()
            }}/>
          </div>
          <img className={styles.cornerGraphicLarge} src={cornerGraphicLarge}/>
          <img className={styles.cornerGraphicSmall} src={cornerGraphicSmall}/>
        </div>
        <SmallInverseSecondaryButton className={styles.btnSecondary} text={this.props.btnTitle} onClick={() => {
          this.handleClick()
        }}/>
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
