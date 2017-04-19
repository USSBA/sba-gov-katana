import React from 'react';
import styles from './primary-button-small.scss';

 const PrimaryButtonSmall = (props) =>
	<div>
		<button className={ styles.primaryButtonSmall } href="{ props.URL }">{ props.text }</button>
	</div>;

export default PrimaryButtonSmall;
