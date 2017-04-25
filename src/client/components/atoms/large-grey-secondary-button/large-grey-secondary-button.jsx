import React from 'react';
import styles from './large-grey-secondary-button.scss';

 const LargeGreySecondaryButton = (props) =>
		<button className={ styles.LargeGreySecondaryButton } href="{ props.URL }">{ props.text }</button>;

export default LargeGreySecondaryButton;

