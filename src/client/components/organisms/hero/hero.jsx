import React from 'react';
import styles from './hero.scss';
import Callout from '../../molecules/callout/callout.jsx'


const Hero = (props) =>
  <div className={ styles.heroContainer}>
	  <img className={ styles.heroDesktopImage } src={ props.desktopImage }/>
	  <img className={ styles.heroMobileImage } src={ props.mobileImage }/>
	  <div className={ styles.callout }>
		<Callout title={ props.title } message={ props.message } buttons={props.buttons} />
	  </div>
  </div>;

export default Hero;
