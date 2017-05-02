import React from 'react';
import styles from './callout.scss';
import SmallInversePrimaryButton from '../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx'

 const Callout = (props) =>
  <div className={styles.callout}>
  <h2>{ props.title }</h2>
  <p>{ props.message }</p>
  <SmallInversePrimaryButton classname={styles.button} text={ props.button } />
  </div>;

export default Callout;
