import React from 'react';
import styles from './secondary-button-small.scss';

 const SecondaryButtonSmall = (props) =>
	<div>
		<button className={ styles.secondaryButtonSmall } href="{ props.URL }">{ props.text }</button>
	</div>;

export default SecondaryButtonSmall;

