import React from 'react';
import styles from './large-inverse-primary-button.scss';

 const LargeInversePrimaryButton = (props) =>
		<button id={props.id} className={ styles.LargeInversePrimaryButton + " " + (props.extraClassName ? props.extraClassName : "") } href={ props.URL } onClick={props.onClick} disabled={props.disabled}>{ props.text }</button>;

export default LargeInversePrimaryButton;
