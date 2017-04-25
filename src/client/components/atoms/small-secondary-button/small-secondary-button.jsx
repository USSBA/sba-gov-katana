import React from 'react';
import styles from './small-secondary-button.scss';

 const SmallSecondaryButton = (props) =>
		<button className={ styles.SmallSecondaryButton } href="{ props.URL }">{ props.text }</button>;

export default SmallSecondaryButton;

