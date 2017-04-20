import React from 'react';
import styles from './inverse-secondary-button-small.scss';

 const InverseSecondaryButtonSmall = (props) =>
	<div>
		<button className={ styles.inverseSecondaryButtonSmall } href="{ props.URL }">{ props.text }</button>
	</div>;

export default InverseSecondaryButtonSmall;

