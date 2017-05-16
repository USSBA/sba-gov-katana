import React from 'react';
import styles from './small-inverse-primary-button.scss';

 const SmallInversePrimaryButton = (props) =>
		<button id={props.id}
		        className={ styles.SmallInversePrimaryButton + " " + (props.extraClassName ? props.extraClassName : "")} 
		        href={ props.URL }
		        onClick={props.onClick}
		        disabled={props.disabled}>
		        { props.text }
		</button>;

export default SmallInversePrimaryButton;
