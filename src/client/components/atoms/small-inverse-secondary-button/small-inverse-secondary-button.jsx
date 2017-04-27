import React from 'react';
import styles from './small-inverse-secondary-button.scss';

 const SmallInverseSecondaryButton = (props) =>
		<button id={props.id} className={ styles.SmallInverseSecondaryButton } href={ props.URL } onClick={props.onClick} disabed={props.disabled}>{ props.text }</button>;

export default SmallInverseSecondaryButton;

