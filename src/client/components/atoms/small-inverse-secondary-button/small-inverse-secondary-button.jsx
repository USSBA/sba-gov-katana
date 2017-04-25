import React from 'react';
import styles from './small-inverse-secondary-button.scss';

 const SmallInverseSecondaryButton = (props) =>
		<button className={ styles.SmallInverseSecondaryButton } href="{ props.URL }">{ props.text }</button>;

export default SmallInverseSecondaryButton;

