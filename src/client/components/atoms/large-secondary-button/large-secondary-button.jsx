import React from 'react';
import styles from './large-secondary-button.scss';

 const LargeSecondaryButton = (props) =>
	<div>
		<button className={ styles.LargeSecondaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default LargeSecondaryButton;

