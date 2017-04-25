import React from 'react';
import styles from './large-secondary-button.scss';

 const LargeSecondaryButton = (props) =>
		<button className={ styles.LargeSecondaryButton } href="{ props.URL }" onClick={props.onClick}>{ props.text }</button>;

export default LargeSecondaryButton;

