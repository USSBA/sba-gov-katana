import React from 'react';
import styles from './callout.scss';
import InversePrimaryButton from '../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx'

 const Callout = (props) =>
  <div className={styles.callout}>
  <h2>{ props.title }</h2>
  <p>{ props.message }</p>
  <SmallInversePrimaryButton text={ props.button } />
  </div>;

export default Callout;
