import React from 'react';
import styles from '../../styles/homepage/primary-landing.scss';
import { Image } from 'react-bootstrap';
import Hero from '../../../../public/assets/images/homepage/primary-landing/primarylanding-hero.jpg';
import MobileHero from '../../../../public/assets/images/homepage/primary-landing/primarylanding-mobile-hero.png';
import Triangle from '../../../../public/assets/images/homepage/primary-landing/corner-graphic.png';
import '../../styles/common/normalize.scss';


class PrimaryLanding extends React.Component {
  render() {
    return (
      <div className={ styles.container }>
        <Image className={ styles.hero } src={ Hero } />
        <Image className={ styles.mobileHero } src={ MobileHero } />
        <Box/>
      </div>
    )
  }
}

export default PrimaryLanding;


const Box = (props) => <div className={ styles.box }>
                         <div className={ styles.title }> Start and grow your business.</div>
                         <div className={ styles.text }> Whether you're already up and running or just getting started, we can help. Come take a look how.</div>
                         <button className={ styles.button } onClick={ (e) => location.href = "https://www.sba.gov/starting-managing-business" }>
                           LET'S GO
                         </button>
                         <Image src={ Triangle } className={ styles.triangle } />
                       </div>;