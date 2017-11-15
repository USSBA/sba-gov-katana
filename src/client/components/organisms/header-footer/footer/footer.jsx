import React from 'react'
import { SocialMediaLink } from 'atoms'
import { PageLinkGroup } from 'molecules'

import constants from '../../../../services/constants.js'

import facebookThumbnail from 'assets/images/footer/facebook.png'
import twitterThumbnail from 'assets/images/footer/twitter.png'
import googlePlusThumbnail from 'assets/images/footer/googleplus.png'
import youtubeThumbnail from 'assets/images/footer/youtube-play.png'
import linkedInThumbnail from 'assets/images/footer/linkedin.png'
import instagramThumbnail from 'assets/images/footer/instagram.png'

import styles from './footer.scss'

const SocialMediaLinkSet = () => {
  return (
    <div className={styles.SocialMediaLinkSet}>
      <SocialMediaLink
        id="facebook-link"
        key={1}
        image={facebookThumbnail}
        altText="SBA Facebook page"
        url="https://www.facebook.com/SBAgov"
      />
      <SocialMediaLink
        id="twitter-link"
        key={2}
        image={twitterThumbnail}
        altText="SBA Twitter page"
        url="https://www.twitter.com/sbagov"
      />
      <SocialMediaLink
        id="google-plus-link"
        key={3}
        image={googlePlusThumbnail}
        altText="SBA Google Plus page"
        url="https://plus.google.com/+sbagov"
      />
      <SocialMediaLink
        id="youtube-link"
        key={4}
        image={youtubeThumbnail}
        altText="SBA Youtube page"
        url="https://www.youtube.com/user/sba"
      />
      <SocialMediaLink
        id="linkedin-link"
        key={5}
        image={linkedInThumbnail}
        altText="SBA LinkedIn page"
        url="https://www.linkedin.com/company/us-small-business-administration"
      />
      <SocialMediaLink
        id="instagram-link"
        key={6}
        image={instagramThumbnail}
        altText="SBA Instagram page"
        url="https://www.instagram.com/sbagov"
      />
    </div>
  )
}
const Address = () => {
  return (
    <div className={styles.address}>
      <span className={styles.name}>{constants.name}</span>
      <span className={styles.location}>{constants.address}</span>
    </div>
  )
}

class Footer extends React.Component {
  render() {
    let firstTabletColumn = _.slice(constants.footer.tablet, 0, 3)
    let secondTabletColumn = _.slice(constants.footer.tablet, 3, 6)
    let thirdTabletColumn = _.slice(constants.footer.tablet, 6)

    let firstMobileColumn = _.slice(constants.footer.mobile, 0, 5)
    let secondMobileColumn = _.slice(constants.footer.mobile, 5)
    return (
      <footer id="sba-footer" className={styles.footer}>
        <div key={1} className={styles.footerLinks}>
          {constants.footer.desktop.map((item, index) => {
            return (
              <div key={index + 10} className={styles.desktopFooterLinks}>
                <PageLinkGroup
                  id={'footer-group-' + index}
                  key={index + 30}
                  title={item.title}
                  links={item.links}
                />
              </div>
            )
          })}
        </div>
        <div key={2} className={styles.tabletFooterLinks}>
          <PageLinkGroup
            id={'tablet-footer-group-1'}
            key={20}
            links={firstTabletColumn}
          />
          <PageLinkGroup
            id={'tablet-footer-group-2'}
            key={21}
            links={secondTabletColumn}
          />
          <PageLinkGroup
            id={'tablet-footer-group-3'}
            key={22}
            links={thirdTabletColumn}
          />
        </div>
        <div key={3} className={styles.mobileFooterLinks}>
          <PageLinkGroup
            id={'mobile-footer-group-1'}
            key={23}
            links={firstMobileColumn}
          />
          <PageLinkGroup
            id={'mobile-footer-group-2'}
            key={24}
            links={secondMobileColumn}
          />
        </div>
        <hr key={4} className={styles.desktopRule} />
        <SocialMediaLinkSet key={5} />
        <hr key={6} className={styles.mobileRule} />
        <Address id="sba-footer-address" key={7} />
      </footer>
    )
  }
}

export default Footer
