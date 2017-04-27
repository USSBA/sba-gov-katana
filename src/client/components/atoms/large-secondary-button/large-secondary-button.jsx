import React from 'react';
import styles from './large-secondary-button.scss';

 const LargeSecondaryButton = (props) =>
		<button id={props.id} className={ styles.LargeSecondaryButton } href={ props.URL } onClick={props.onClick} disabled={props.disabled} >{ props.text }</button>;

export default LargeSecondaryButton;

