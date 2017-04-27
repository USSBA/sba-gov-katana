import React from 'react';
import styles from './large-grey-secondary-button.scss';

 const LargeGreySecondaryButton = (props) =>
		<button id={props.id} className={ styles.LargeGreySecondaryButton } href={ props.URL } onClick={props.onClick} disabed={props.disabled}>{ props.text }</button>;

export default LargeGreySecondaryButton;

