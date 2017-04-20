import React from 'react';
import styles from './callout.scss';
import InversePrimaryButton from '../../atoms/inverse-primary-button/inverse-primary-button.jsx'

 const Callout = (props) =>
  <div className={styles.callout}>
  <h2>{ props.title }</h2>
  <p>{ props.message }</p>
  <InversePrimaryButton text={ props.button } />
  </div>;

export default Callout;
