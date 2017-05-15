import React from 'react';
import styles from './callout.scss';
import LargeInversePrimaryButton from '../../atoms/large-inverse-primary-button/large-inverse-primary-button.jsx'

 const Callout = (props) =>
  <div className={styles.callout}>
  <h2 className={styles.title}>{ props.title }</h2>
  <p className={styles.message}>{ props.message }</p>
  <LargeInversePrimaryButton classname={styles.button} text={ props.button } URL={props.URL}/>
  </div>;

export default Callout;
