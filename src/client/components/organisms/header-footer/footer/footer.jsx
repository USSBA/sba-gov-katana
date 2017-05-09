import React from 'react';
import styles from './footer.scss';

import SocialMediaLink from "../../../atoms/social-media-link/social-media-link.jsx";
import PageLinkGroup from "../../../molecules/page-link-group/page-link-group.jsx";
import constants from "../../../../services/constants.js";

import facebookThumbnail from "../../../../../../public/assets/images/footer/facebook.png"
import twitterThumbnail from "../../../../../../public/assets/images/footer/twitter.png"
import googlePlusThumbnail from "../../../../../../public/assets/images/footer/googleplus.png"
import youtubeThumbnail from "../../../../../../public/assets/images/footer/youtube-play.png"
import linkedInThumbnail from "../../../../../../public/assets/images/footer/linkedin.png"

const SocialMediaLinkSet = () => {
  return (
    <div className={styles.SocialMediaLinkSet}>
      <SocialMediaLink key={1} image={facebookThumbnail} altText="SBA Facebook page" url="https://www.facebook.com/SBAgov"/>
      <SocialMediaLink key={2} image={twitterThumbnail} altText="SBA Twitter page" url="https://www.twitter.com/sbagov"/>
      <SocialMediaLink key={3} image={googlePlusThumbnail} altText="SBA Google Plus page" url="https://plus.google.com/+sbagov"/>
      <SocialMediaLink key={4} image={youtubeThumbnail} altText="SBA Youtube page" url="https://www.youtube.com/user/sba"/>
      <SocialMediaLink key={5} image={linkedInThumbnail} altText="SBA LinkedIn page" url="https://www.linkedin.com/company/us-small-business-administration"/>
    </div>
  );
}
const Address = () => {
  return (
    <div className={styles.address}>
      <span className={styles.name}>{constants.name}</span>
      <span className={styles.location}>{constants.address}</span>
    </div>
  );
}

class Footer extends React.Component {
  render() {
    let firstTabletColumn = _.slice(constants.footer.tablet, 0, 3);
    let secondTabletColumn = _.slice(constants.footer.tablet, 3, 6);
    let thirdTabletColumn = _.slice(constants.footer.tablet, 6);

    let firstMobileColumn = _.slice(constants.footer.mobile, 0, 5);
    let secondMobileColumn = _.slice(constants.footer.mobile, 5);
    return (
      <footer className={styles.footer}>
        <div key={1} className={styles.footerLinks}>
          {constants.footer.desktop.map((item, index) => {
            return (
              <div className={styles.desktopFooterLinks}><PageLinkGroup key={index} title={item.title} links={item.links}/></div>
            );
          })}</div>
        <div key={2} className={styles.tabletFooterLinks}>
          <PageLinkGroup key={20} links={firstTabletColumn}/>
          <PageLinkGroup key={21} links={secondTabletColumn}/>
          <PageLinkGroup key={22} links={thirdTabletColumn}/>
        </div>
        <div key={3} className={styles.mobileFooterLinks}>
          <PageLinkGroup key={23} links={firstMobileColumn}/>
          <PageLinkGroup key={24} links={secondMobileColumn}/>
        </div>
          <hr key={4} className={styles.desktopRule}/>
          <SocialMediaLinkSet key={5}/>
          <hr key={6} className={styles.mobileRule}/>
          <Address key={7}/>
      </footer>
    );
  };
}

export default Footer;
