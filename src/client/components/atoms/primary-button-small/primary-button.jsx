import React from 'react';
import styles from './primary-button.scss';

 const PrimaryButton = (props) =>
	<div>
		<button className={ styles.primaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default PrimaryButton;
