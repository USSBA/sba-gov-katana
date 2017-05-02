import React from 'react';
import styles from './large-primary-button.scss';

 const LargePrimaryButton = (props) =>
		<button id={props.id} className={styles.LargePrimaryButton} href={ props.URL } onClick={props.onClick} disabled={props.disabled}>{ props.text }</button>;

export default LargePrimaryButton;
