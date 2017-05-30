import React from 'react';
import styles from './call-to-action.scss';
import SmallInversePrimaryButton from "../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx";
import SmallInverseSecondaryButton from "../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx";
//import diagonalLines from '../../../../../public/assets/images/homepage/diagonal-lines.png';
import cornerGraphicLarge from './corner-graphic-large.png';
import cornerGraphicSmall from './corner-graphic-small.png';

class Callout extends React.Component {

  handleClick(){
    window.location.href = this.props.btnUrl
  }

  ctaSize(){
    if(this.props.size === "Large"){
      return styles.large
    } else if(this.props.size === "Medium"){
      return styles.medium
    } else if (this.props.size === "Small"){
      return styles.small
    } else if (this.props.size === "Button only"){
      return styles.btnOnly
    } else {
      return null
    }
  }

  render(){
    return (
      <div className={this.ctaSize()}>
        <div id="call-to-action" className={styles.ctaContainer}>
          <img className={styles.image} src={this.props.image} alt={this.props.imageAlt}/>
          <div className={styles.contentContainer}>
            <h4 className={styles.headline}>{this.props.headline}</h4>
            <p className={styles.blurb}>{this.props.blurb}</p>
            <SmallInversePrimaryButton className={styles.btn} text={this.props.btnTitle} onClick={() => {this.handleClick()}}/>
          </div>
          <img className={styles.cornerGraphicLarge} src={cornerGraphicLarge}/>
          <img className={styles.cornerGraphicSmall} src={cornerGraphicSmall}/>
        </div>
        <SmallInverseSecondaryButton className={styles.btnSecondary} text={this.props.btnTitle} onClick={() => {this.handleClick()}}/>
      </div>

    ) ;
  }
}

export default Callout;
