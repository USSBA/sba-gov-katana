import React from 'react';
import styles from './small-grey-secondary-button.scss';

 const SmallGreySecondaryButton = (props) =>
		<button className={ styles.SmallGreySecondaryButton } href="{ props.URL }" onClick={props.onClick} >{ props.text }</button>;

export default SmallGreySecondaryButton;

