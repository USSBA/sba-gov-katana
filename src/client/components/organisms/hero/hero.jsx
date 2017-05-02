import React from 'react';
import styles from './hero.scss';
import Callout from '../../molecules/callout/callout.jsx'
import HeroImage from './hero.jpg'

 const Hero = (props) =>
  <div className={ styles.heroContainer }>
  <img className={ styles.heroImage } src={ HeroImage }/>
  <div className={ styles.callout }>
  <Callout title={ props.title } message={ props.message } button={ props.button }/>
  </div>
  </div>;

export default Hero;
