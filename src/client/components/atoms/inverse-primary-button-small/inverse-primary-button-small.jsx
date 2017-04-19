import React from 'react';
import styles from './inverse-primary-button-small.scss';

 const InversePrimaryButtonSmall = (props) =>
	<div>
		<button className={ styles.inversePrimaryButtonSmall } href="{ props.URL }">{ props.text }</button>
	</div>;

export default InversePrimaryButtonSmall;

