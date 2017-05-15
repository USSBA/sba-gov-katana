import React from 'react';
import styles from './callout.scss';
import SmallInverseSecondaryButton from "../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx";

class Callout extends React.Component {
 render(){

   return (
       <div className={styles.callout}>
          <h2 className={styles.title}>{ this.props.title }</h2>
          <p className={styles.message}>{ this.props.message }</p>
          <div className={styles.buttonContainer}>
              {
               this.props.buttons.map((item, index)=>{
                   return (<div className={styles.button} key={index}><SmallInverseSecondaryButton text={item.btnText} key={index} onClick={item.onClickHandler}/></div>);
               })
              }
           </div>
       </div>
   ) ;
 }


 }
export default Callout;
