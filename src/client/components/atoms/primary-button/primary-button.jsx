import React from 'react';
import styles from './primary-button.scss';

 const PrimaryButton = (props) => 
	<div>
		<button href="{ props.URL }">{ props.text }</button>
	</div>;

export default PrimaryButton;


// function(){
// 	let className = "";
// 	if(_.includes(this.props, "small"){
// className += "small";
// 	}else if(_.includes(this.props, "small"){
// 		className = "large";
// 	} else{
// className = "normal";
// 	}
// }

//  const PrimaryButton = () => 
// 	<div>
// 		<a className={props.newtab ? styles.inverse : styles.normal  + " " + props.small ? styles.small : (props.large? styles.large: styles.)} href="{ props.URL }">{ props.text }</a>
// 	</div>;

// <PrimaryButton inverse text="Click me" url="http://google.com" />