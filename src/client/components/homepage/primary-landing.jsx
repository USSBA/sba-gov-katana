import React from 'react';
import styles from '../../styles/homepage/primary-landing.scss';
import { Image } from 'react-bootstrap';
import Triangle from '../../../../public/assets/images/homepage/primary-landing/desktop-corner-graphic.png';
import MobileTriangle from '../../../../public/assets/images/homepage/primary-landing/mobile-corner-graphic.png';

import '../../styles/common/normalize.scss';


class PrimaryLanding extends React.Component {
  render() {
    return (
      <div className={ styles.container }>
        <Image alt="banner image of small business owner" className={ styles.hero } src={ "https://s3.amazonaws.com/fearlesstesters.com/img/primarylanding-hero.jpg" } />
        <Image alt="banner image of small business owner" className={ styles.mobileHero } src={ "https://s3.amazonaws.com/fearlesstesters.com/img/primarylanding-mobile-hero.png" } />
        <Box/>
      </div>
    )
  }
}

export default PrimaryLanding;


const Box = (props) => <div className={ styles.box }>
                         <div className={ styles.title }> Start and grow your business.</div>
                         <div className={ styles.text }> Whether you're already up and running or just getting started, we can help. Come take a look how.</div>
                         <button className={ styles.button } onClick={ (e) => location.href = "/starting-managing-business" }>
                           LET'S GO
                         </button>
                         <Image alt="" src={ Triangle } className={ styles.triangle } />
                         <Image alt="" src={ MobileTriangle } className={ styles.mobileTriangle } />
                       </div>;
