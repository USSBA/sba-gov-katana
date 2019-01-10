import React from 'react'
import Waypoint from 'react-waypoint'

import clientConfig from '../../../services/client-config'
import scrollIcon from 'assets/svg/scroll.svg'
import styles from './ten-steps-landing-page.scss'
import { Link } from 'atoms'
import { CallToAction, RemoveMainLoader, LongScrollNav } from 'molecules'
import { LongScrollSection, MenuTileCollection } from 'organisms'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper'
import { findPageLineage, findSubSection, findSection } from '../../../services/menu'
import { getLanguageOverride } from '../../../services/utils'
import { TRANSLATIONS } from '../../../translations'

class TenStepsLandingPage extends React.Component {
  constructor() {
    super()
    this.state = {
      counselorCta: null,
      section: null,
      langCode: getLanguageOverride(true),
      mainMenu: null,
      navType: 'top'
    }
  }

  async componentDidMount() {
    const { langCode } = this.state
    const mainMenu = await fetchSiteContent('mainMenu')
    const counselorCta = await fetchRestContent('node', clientConfig.counselorCta, langCode)
    const { spanishTranslation } = counselorCta

    this.setState({
      counselorCta: langCode.startsWith('es') && spanishTranslation ? spanishTranslation : counselorCta,
      mainMenu
    })
  }

  handleSectionEnter(index) {
    this.setState({ section: index }, this.toggleNavType)
  }

  handleSectionLeave(index) {}

  handleTitleSectionEnter() {
    this.setState({ section: 'titleSection' }, this.toggleNavType)
  }

  handleTitleSectionLeave() {
    this.setState({ section: 0, navType: 'center' })
  }

  handleCalloutEnter() {
    this.setState({ section: null, navType: null })
  }

  handleCalloutLeave() {
    this.setState({ section: 9, navType: 'center' })
  }

  toggleNavType() {
    if (this.state.section >= 1) {
      this.setState({ navType: 'center' })
    } else if (this.state.section == 'titleSection') {
      this.setState({ navType: 'top' })
    }
  }

  render() {
    const { langCode, mainMenu } = this.state
    const titleBoxDataArray = [
      {
        leftAlignBox: true,
        solidBox: false,
        image: '/assets/images/tensteps/research.png'
      },
      {
        leftAlignBox: false,
        solidBox: true,
        image: '/assets/images/tensteps/plan.jpg'
      },
      {
        leftAlignBox: true,
        solidBox: false,
        image: '/assets/images/tensteps/fund.jpg'
      },
      {
        leftAlignBox: false,
        solidBox: true,
        image: '/assets/images/tensteps/location.jpg'
      },
      {
        leftAlignBox: true,
        solidBox: false,
        image: '/assets/images/tensteps/business-structure-scrabble.png'
      },
      {
        leftAlignBox: true,
        solidBox: true,
        image: '/assets/images/tensteps/name.jpg'
      },
      {
        leftAlignBox: false,
        solidBox: true,
        image: '/assets/images/tensteps/register.jpg'
      },
      {
        leftAlignBox: true,
        solidBox: false,
        image: '/assets/images/tensteps/tax-ids.png'
      },
      {
        leftAlignBox: false,
        solidBox: true,
        image: '/assets/images/tensteps/license.jpg'
      },
      {
        leftAlignBox: true,
        solidBox: false,
        image: '/assets/images/tensteps/bank.png'
      }
    ].map((section, index) => {
      const id = index + 1
      const { link, text, title } = TRANSLATIONS[`tenSteps${id}`][langCode]

      section.imageAlt = title
      section.link = link
      section.sectionNum = id
      section.text = text
      section.title = title

      return section
    })

    const tenstepSectionItems = titleBoxDataArray.map((item, index) => {
      return (
        <LongScrollSection
          index={index}
          key={index}
          sectionItem={item}
          sectionEnter={() => {
            this.handleSectionEnter(index)
          }}
          sectionLeave={() => {
            this.handleSectionLeave(index)
          }}
        />
      )
    })

    const sectionData = findSection(mainMenu, 'guide') || findSection(mainMenu, 'business-guide')

    const { counselorCta } = this.state
    let blurb, buttonAction, headline, image, title

    if (counselorCta) {
      blurb = counselorCta.blurb
      buttonAction = counselorCta.buttonAction
      headline = counselorCta.headline
      image = counselorCta.image
      title = counselorCta.title
    }

    return (
      <div className={styles.tenStepsLandingPage}>
        <RemoveMainLoader />
        {this.state.navType === 'center' ? (
          <LongScrollNav navType="center" section={this.state.section} />
        ) : null}
        <div className={styles.titleSection}>
          {this.state.navType === 'top' ? <LongScrollNav navType="top" /> : null}
          <div className={styles.titleSectionText}>
            <h1>{TRANSLATIONS.tenStepsHero[langCode].title}</h1>
            <Waypoint
              onEnter={() => {
                this.handleTitleSectionEnter()
              }}
              onLeave={() => {
                this.handleTitleSectionLeave()
              }}
            >
              <p>{TRANSLATIONS.tenStepsHero[langCode].text}</p>
            </Waypoint>
          </div>
          <a aria-hidden="true" href="#step-1">
            <img className={styles.scrollButton} src={scrollIcon} />
          </a>
          <Link className={styles.backLink} to={TRANSLATIONS.tenStepsHero[langCode].link}>
            {TRANSLATIONS.backToAllTopics[langCode].text}
          </Link>
        </div>
        <span id="step-1" className={styles.anchor} />
        <div id="tensteps-landing-page-id" className={styles.tenStepsLandingPage}>
          {tenstepSectionItems}
        </div>
        <div className={styles.lastSection}>
          <div className={styles.lastSectionText}>
            <h1>{TRANSLATIONS.tenStepsOpenShop[langCode].title}</h1>
            <Waypoint
              onEnter={() => {
                this.handleCalloutEnter()
              }}
            >
              <p>{TRANSLATIONS.tenStepsOpenShop[langCode].text}</p>
            </Waypoint>
          </div>
        </div>
        {/*
          Render Business Guide Tile using MenuTileCollection.
          sectionData ? (
          <div className={styles.bizguideContainer}>
            <h1>Explore more topics</h1>
            <MenuTileCollection data={sectionData} />
          </div>
        ) : (
          <div />
        )*/}{' '}
        {counselorCta ? (
          <div className={styles.counselorCtaContainer}>
            <CallToAction
              size="Large"
              headline={headline}
              blurb={blurb}
              title={title}
              buttonAction={buttonAction}
              image={image}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default TenStepsLandingPage
