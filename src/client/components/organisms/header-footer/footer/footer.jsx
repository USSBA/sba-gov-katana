import React from 'react'

import facebookThumbnail from 'assets/images/footer/facebook.png'
import googlePlusThumbnail from 'assets/images/footer/googleplus.png'
import instagramThumbnail from 'assets/images/footer/instagram.png'
import linkedInThumbnail from 'assets/images/footer/linkedin.png'
import twitterThumbnail from 'assets/images/footer/twitter.png'
import youtubeThumbnail from 'assets/images/footer/youtube-play.png'

import constants from '../../../../services/constants'
import styles from './footer.scss'

import { TRANSLATIONS } from '../../../../translations'
import { getLanguageOverride } from '../../../../services/utils'
import { SocialMediaLink } from 'atoms'
import { PageLinkGroup } from 'molecules'

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
    const langCode = getLanguageOverride(true)
    const desktopLinks = [
      {
        title: TRANSLATIONS.customerService,
        links: [
          TRANSLATIONS.aboutSba,
          TRANSLATIONS.contactSba,
          TRANSLATIONS.sbaEnEspanol,
          TRANSLATIONS.mediaAndPressRelations,
          TRANSLATIONS.sbaLocations,
          TRANSLATIONS.sbaTeam
        ]
      },
      {
        title: TRANSLATIONS.aboutSbaGov,
        links: [
          TRANSLATIONS.siteMap,
          TRANSLATIONS.privacyPolicy,
          TRANSLATIONS.linkingPolicy,
          TRANSLATIONS.accessibility,
          TRANSLATIONS.disclaimers,
          TRANSLATIONS.socialMedia,
          TRANSLATIONS.dataStore,
          TRANSLATIONS.blog
        ]
      },
      {
        title: TRANSLATIONS.sbaInformation,
        links: [
          TRANSLATIONS.freedomOfInformationAct,
          TRANSLATIONS.noFearAct,
          TRANSLATIONS.reportFraudWasteAndAbuse,
          TRANSLATIONS.initiatives,
          TRANSLATIONS.plainLanguage
        ]
      },
      {
        title: TRANSLATIONS.sbaPerformance,
        links: [
          TRANSLATIONS.strategicPlanning,
          TRANSLATIONS.performanceBudgetAndFinancing,
          TRANSLATIONS.openGovernment,
          TRANSLATIONS.policyAndRegulations,
          TRANSLATIONS.eliminatingFraudWasteAndAbuse
        ]
      },
      {
        title: TRANSLATIONS.oversight,
        links: [
          TRANSLATIONS.inspectorGeneral,
          TRANSLATIONS.advocacy,
          TRANSLATIONS.hearingsAndAppeals,
          TRANSLATIONS.ombudsman,
          TRANSLATIONS.whiteHouseGov,
          TRANSLATIONS.usaGov,
          TRANSLATIONS.regulationsGov
        ]
      },
      {
        title: TRANSLATIONS.toolsAndFeatures,
        links: [
          TRANSLATIONS.onlineTraining,
          TRANSLATIONS.createABusinessPlan,
          TRANSLATIONS.findEvents,
          TRANSLATIONS.qualifyForGovernmentContracts,
          TRANSLATIONS.sbaVideos
        ]
      }
    ]

    return (
      <footer id="sba-footer" className={styles.footer}>
        <div key={1} className={styles.footerLinks}>
          {desktopLinks.map((item, index) => {
            return (
              <div key={index + 10} className={styles.desktopFooterLinks}>
                <PageLinkGroup
                  id={'footer-group-' + index}
                  key={index + 30}
                  langCode={langCode}
                  links={item.links}
                  title={item.title}
                />
              </div>
            )
          })}
        </div>
        <div key={2} className={styles.tabletFooterLinks}>
          <PageLinkGroup
            id="tablet-footer-group-1"
            key={20}
            langCode={langCode}
            links={[TRANSLATIONS.whatWeDo, TRANSLATIONS.sbaPerformance, TRANSLATIONS.contactSba]}
          />
          <PageLinkGroup
            id="tablet-footer-group-2"
            key={21}
            langCode={langCode}
            links={[TRANSLATIONS.sbaTeam, TRANSLATIONS.foia, TRANSLATIONS.privacyPolicy]}
          />
          <PageLinkGroup
            id="tablet-footer-group-3"
            key={22}
            langCode={langCode}
            links={[TRANSLATIONS.newsroom, TRANSLATIONS.oversightAndAdvocacy, TRANSLATIONS.sbaEnEspanol]}
          />
        </div>
        <div key={3} className={styles.mobileFooterLinks}>
          <PageLinkGroup
            id="mobile-footer-group-1"
            key={23}
            langCode={langCode}
            links={[
              TRANSLATIONS.whatWeDo,
              TRANSLATIONS.newsroom,
              TRANSLATIONS.foia,
              TRANSLATIONS.contactSba,
              TRANSLATIONS.sbaEnEspanol
            ]}
          />
          <PageLinkGroup
            id="mobile-footer-group-2"
            key={24}
            langCode={langCode}
            links={[
              TRANSLATIONS.sbaTeam,
              TRANSLATIONS.sbaPerformance,
              TRANSLATIONS.oversightAndAdvocacy,
              TRANSLATIONS.privacyPolicy,
              TRANSLATIONS.blog
            ]}
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
