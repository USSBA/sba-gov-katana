import React from 'react';
import styles from './small-primary-button.scss';

 const SmallPrimaryButton = (props) =>
	<div>
		<button className={ styles.SmallPrimaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default SmallPrimaryButton;
