import React from 'react';
import styles from './large-inverse-secondary-button.scss';

 const LargeInverseSecondaryButton = (props) =>
		<button className={ styles.LargeInverseSecondaryButton } href="{ props.URL }">{ props.text }</button>;

export default LargeInverseSecondaryButton;

