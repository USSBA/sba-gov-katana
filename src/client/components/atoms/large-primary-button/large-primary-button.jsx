import React from 'react';
import styles from './large-primary-button.scss';

 const LargePrimaryButton = (props) =>
	<div>
		<button className={ styles.LargePrimaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default LargePrimaryButton;
