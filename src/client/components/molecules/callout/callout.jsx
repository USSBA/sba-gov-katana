import React from 'react';
import styles from './callout.scss';
import SmallInverseSecondaryButton from "../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx";
import SmallInversePrimaryButton from "../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx";

class Callout extends React.Component {
 render(){

   return (
       <div className={styles.callout}>
          <h2 className={styles.title}>{ this.props.title }</h2>
          <p className={styles.message}>{ this.props.message }</p>
          <div className={styles.buttonContainer}>
              {
               this.props.buttons.map((item, index)=>{
                   if(item.btnType === "SmallInverseSecondaryButton"){
                       return (<div className={styles.button} key={index}><SmallInverseSecondaryButton text={item.btnText} key={index} onClick={item.onClickHandler}/></div>);
                   }
                   if(item.btnType === "SmallInversePrimaryButton"){
                       return (<div className={styles.button} key={index}><SmallInversePrimaryButton text={item.btnText} key={index} onClick={item.onClickHandler}/></div>);v
                   }
               })
              }
           </div>
       </div>
   ) ;
 }


 }
export default Callout;
