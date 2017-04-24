import React from 'react';
import styles from './large-inverse-secondary-button.scss';

 const LargeInverseSecondaryButton = (props) =>
	<div>
		<button className={ styles.LargeInverseSecondaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default LargeInverseSecondaryButton;

