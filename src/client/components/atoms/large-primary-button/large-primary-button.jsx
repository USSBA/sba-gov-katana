import React from 'react';
import styles from './large-primary-button.scss';

 const LargePrimaryButton = (props) =>
		<button className={ styles.LargePrimaryButton } href="{ props.URL }">{ props.text }</button>;

export default LargePrimaryButton;
