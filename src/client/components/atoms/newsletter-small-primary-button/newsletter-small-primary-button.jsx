import React from 'react';
import styles from './newsletter-small-primary-button.scss';

 const NewsletterSmallPrimaryButton = (props) =>
	<div>
		<button id={props.id} className={ styles.NewsletterSmallPrimaryButton } href={props.URL} onClick={props.onClick} disabled={props.disabled}>{ props.text }</button>
	</div>;

export default NewsletterSmallPrimaryButton;
