import React from 'react';
import styles from './large-grey-secondary-button.scss';

 const LargeGreySecondaryButton = (props) =>
	<div>
		<button className={ styles.LargeGreySecondaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default LargeGreySecondaryButton;

