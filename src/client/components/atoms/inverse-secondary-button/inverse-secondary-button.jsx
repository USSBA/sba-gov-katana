import React from 'react';
import styles from './inverse-secondary-button.scss';

 const InverseSecondaryButton = (props) =>
	<div>
		<button href="{ props.URL }">{ props.text }</button>
	</div>;

export default InverseSecondaryButton;

