import React from 'react';
import styles from './large-inverse-secondary-button.scss';

 const LargeInverseSecondaryButton = (props) =>
		<button id={props.id} className={ styles.LargeInverseSecondaryButton } href={ props.URL } onClick={props.onClick}disabed={props.disabled}>{ props.text }</button>;

export default LargeInverseSecondaryButton;

