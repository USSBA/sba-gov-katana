import React from 'react';
import styles from './small-grey-secondary-button.scss';

 const SmallGreySecondaryButton = (props) =>
	<div>
		<button className={ styles.SmallGreySecondaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default SmallGreySecondaryButton;

