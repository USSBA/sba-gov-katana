import React from 'react';
import styles from './large-inverse-primary-button.scss';

 const LargeInversePrimaryButton = (props) =>
		<button id={props.id} className={ styles.LargeInversePrimaryButton } href={ props.URL } onClick={props.onClick} disabed={props.disabled}>{ props.text }</button>;

export default LargeInversePrimaryButton;

