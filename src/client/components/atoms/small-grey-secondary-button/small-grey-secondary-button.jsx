import React from 'react';
import styles from './small-grey-secondary-button.scss';

 const SmallGreySecondaryButton = (props) =>
		<button id={props.id} className={ styles.SmallGreySecondaryButton } href={ props.URL } onClick={props.onClick} onClick={props.onClick} disabled={props.disabled}>{ props.text }</button>;

export default SmallGreySecondaryButton;

