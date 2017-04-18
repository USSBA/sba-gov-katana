import React from 'react';
import styles from './inverse-primary-button.scss';

 const InversePrimaryButton = (props) =>
	<div>
		<button className={ styles.inversePrimaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default InversePrimaryButton;

