import React, { Component } from 'react'
import { isEmpty, kebabCase, startCase } from 'lodash'

import facebookThumbnail from 'assets/images/footer/facebook.png'
import instagramThumbnail from 'assets/images/footer/instagram.png'
import linkedInThumbnail from 'assets/images/footer/linkedin.png'
import twitterThumbnail from 'assets/images/footer/twitter.png'
import youtubeThumbnail from 'assets/images/footer/youtube-play.png'

import constants from '../../../../services/constants'
import styles from './footer.scss'

import { TRANSLATIONS } from '../../../../translations'
import { getLanguageOverride } from '../../../../services/utils'
import { SocialMediaLink } from 'atoms'
import { NewsletterForm, PageLinkGroup } from 'molecules'

import axios from 'axios'

const SocialMediaLinkSet = () => {
  const socialMediaLinks = [
    {
      name: 'facebook',
      image: facebookThumbnail,
      url: 'https://facebook.com/SBAgov'
    },
    {
      name: 'twitter',
      image: twitterThumbnail,
      url: 'https://twitter.com/sbagov'
    },
    {
      name: 'youtube',
      image: youtubeThumbnail,
      url: 'https://youtube.com/user/sba'
    },
    {
      name: 'linkedIn',
      image: linkedInThumbnail,
      url: 'https://linkedin.com/company/us-small-business-administration'
    },
    {
      name: 'instagram',
      image: instagramThumbnail,
      url: 'https://instagram.com/sbagov'
    }
  ]

  return (
    <div className={styles.SocialMediaLinkSet}>
      {socialMediaLinks.map(({ name, image, url }) => (
        <SocialMediaLink
          altText={`SBA ${startCase(name)} page`}
          id={kebabCase(`${name} link`)}
          image={image}
          key={name}
          url={url}
        />
      ))}
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
  constructor(props) {
    super(props)
    this.state = {
      desktopLinks: null
    }
  }
  async componentDidMount() {
    const { data } = await axios.get('https://avery.ussba.io/api/content/footerMenu.json')
    const formatDesktopLink = (item, isChild) => {
      const format = obj => ({
        text: obj.linkTitle,
        url: obj.link
      })
      const title = {
        en: format(item)
      }
      if (item.spanishTranslation) {
        title.es = format(item.spanishTranslation)
      }
      const result = isChild ? title : { title }
      if (!isEmpty(item.children)) {
        result.links = item.children.map(child => formatDesktopLink(child, true))
      }
      return result
    }
    const desktopLinks = data.map(datum => formatDesktopLink(datum))
    this.setState({ desktopLinks })
  }
  render() {
    const { desktopLinks } = this.state
    const langCode = getLanguageOverride(true)
    return (
      <footer id="sba-footer" className={styles.footer}>
        <div key={1} className={styles.footerLinks}>
          {!isEmpty(desktopLinks) &&
            desktopLinks.map((item, index) => {
              return (
                <div key={index + 10} className={styles.desktopFooterLinks}>
                  <PageLinkGroup
                    id={'footer-group-' + index}
                    key={index + 30}
                    langCode={langCode}
                    links={item.links}
                    title={item.title[langCode].text}
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
            links={[TRANSLATIONS.newsroom, TRANSLATIONS.inspectorGeneral, TRANSLATIONS.sbaEnEspanol]}
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
              TRANSLATIONS.inspectorGeneral,
              TRANSLATIONS.privacyPolicy,
              TRANSLATIONS.blog
            ]}
          />
        </div>
        <hr key={4} className={styles.desktopRule} />
        <div className={styles.subContainer}>
          <SocialMediaLinkSet key={5} />
          <NewsletterForm title={TRANSLATIONS.govDelivery[langCode].footerTitle} footer />
          <hr key={6} className={styles.mobileRule} />
          <Address id="sba-footer-address" key={7} />
        </div>
      </footer>
    )
  }
}

export default Footer
