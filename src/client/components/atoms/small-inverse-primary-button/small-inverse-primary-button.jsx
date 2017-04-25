import React from 'react';
import styles from './small-inverse-primary-button.scss';

 const SmallInversePrimaryButton = (props) =>
		<button className={ styles.SmallInversePrimaryButton } href="{ props.URL }">{ props.text }</button>;

export default SmallInversePrimaryButton;

