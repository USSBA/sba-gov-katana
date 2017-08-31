import React from "react";
import {LargeInversePrimaryButton} from "atoms";
import Triangle from "../../../../../../public/assets/images/homepage/primary-landing/desktop-corner-graphic.png";
import styles from "./front-page-lady.scss";

class FrontPageLady extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img alt="banner image of small business owner" className={styles.hero} src={"assets/images/homepage/primarylanding-hero.jpg"}/>
          <img alt="banner image of small business owner" className={styles.mobileHero} src={"assets/images/homepage/primarylanding-mobile-hero.png"}/>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <div className={styles.title}>
              Start and grow your business.</div>
            <div className={styles.text}>
              Whether you're already up and running or just getting started, we can help. Come take a look how.</div>
            <LargeInversePrimaryButton text="LET'S GO" URL="./starting-managing-business"/>
            <img alt="" src={Triangle} className={styles.triangle}/>
          </div>
        </div>
      </div>
    )
  }
}

export default FrontPageLady;
