import React from 'react';
import styles from './secondary-button.scss';

 const SecondaryButton = (props) =>
	<div>
		<button className={ styles.secondaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default SecondaryButton;

