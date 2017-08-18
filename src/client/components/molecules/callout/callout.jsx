import React from 'react';
import styles from './callout.scss';
import LargeInverseSecondaryButton from "../../atoms/large-inverse-secondary-button/large-inverse-secondary-button.jsx";
import LargeInversePrimaryButton from "../../atoms/large-inverse-primary-button/large-inverse-primary-button.jsx";
import LargePrimaryButton from "../../atoms/large-primary-button/large-primary-button.jsx";

class Callout extends React.Component {
  
  render() {

    let calloutStyles = styles.callout;
    let buttonStyles = styles.button;

    if (this.props.inHeroWithNoImage) {
      calloutStyles +=  " " + styles.noDecoration
      buttonStyles += " " + styles.noFloat
    }

    return (
       <div className={`callout ${calloutStyles}`}>
          <h2 className={`callout-title ${styles.title}`}>{ this.props.title }</h2>
          <p className={`callout-message ${styles.message}`}>{ this.props.message }</p>
          <div className={`callout-buttons ${styles.buttonContainer}`}>
            <div className={`callout-button ${buttonStyles}`}>
              {
                this.props.buttons.map((item, index) => {
                  if (item.btnType === "LargePrimaryButton") {
                    return (<LargePrimaryButton text={item.btnText} key={index} onClick={item.onClickHandler}/>);
                  } else if (item.btnType === "LargeInversePrimaryButton") {
                    return (<LargeInversePrimaryButton text={item.btnText} key={index} onClick={item.onClickHandler}/>);
                  } else if (item.btnType === "LargeInverseSecondaryButton") {
                    return (
                      <LargeInverseSecondaryButton text={item.btnText} key={index} onClick={item.onClickHandler}/>);
                  }
                })
              }
            </div>
           </div>
       </div>
    );
  
  }

 }
export default Callout;
