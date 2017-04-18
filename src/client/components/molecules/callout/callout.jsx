import React from 'react';
import styles from './callout.scss';
import InversePrimaryButton from '../../atoms/inverse-primary-button/inverse-primary-button.jsx'

 const Callout = (props) =>
  <div className={styles.callout}>
  <h3>{ props.title }</h3>
  <p>{ props.message }</p>
  <InversePrimaryButton text={ props.button } />
  </div>;

export default Callout;
