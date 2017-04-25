import React from 'react';
import styles from './small-primary-button.scss';

 const SmallPrimaryButton = (props) =>
		<button className={ styles.SmallPrimaryButton } href="{ props.URL }">{ props.text }</button>;

export default SmallPrimaryButton;
