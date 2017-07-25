import React from 'react';
import styles from './callout.scss';
import LargeInverseSecondaryButton from "../../atoms/large-inverse-secondary-button/large-inverse-secondary-button.jsx";
import LargeInversePrimaryButton from "../../atoms/large-inverse-primary-button/large-inverse-primary-button.jsx";

class Callout extends React.Component {
  
  render() {

    let calloutStyles = styles.callout
    let buttonStyles = styles.button

    if (this.props.inHeroWithNoImage) {
      calloutStyles +=  " " + styles.noDecoration
      buttonStyles += " " + styles.noFloat
    }

    return (
       <div className={calloutStyles}>
          <h2 className={styles.title}>{ this.props.title }</h2>
          <p className={styles.message}>{ this.props.message }</p>
          <div className={styles.buttonContainer}>
              {
               this.props.buttons.map((item, index)=>{
                   if(item.btnType === "LargeInverseSecondaryButton"){
                       return (<div className={buttonStyles} key={index}><LargeInverseSecondaryButton text={item.btnText} key={index} onClick={item.onClickHandler}/></div>);
                   }
                   if(item.btnType === "LargeInversePrimaryButton"){
                       return (<div className={buttonStyles} key={index}><LargeInversePrimaryButton text={item.btnText} key={index} onClick={item.onClickHandler}/></div>);
                   }
               })
              }
           </div>
       </div>
    );
  
  }

 }
export default Callout;
