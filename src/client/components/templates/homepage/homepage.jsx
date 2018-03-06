import React from 'react'
import { FrontPageHero, HappeningNow, Blog, MenuTileCollection } from 'organisms'
import styles from './homepage.scss'
import homepageJson from './homepage.json'

class Homepage extends React.Component {
  render() {
    const startLinks = [
      {
        link: '/starting-business/how-start-business/10-steps-starting-business',
        title: '10 steps to get started'
      },
      {
        link: '/tools/local-assistance#locations-page',
        title: 'Find local mentoring and support'
      },
      {
        link: '/tools/business-plan/1?from_mobile=true',
        title: 'Create a business plan'
      }
    ]
    const financeLinks = [
      {
        link: '/loans-grants/see-what-sba-offers/what-sba-offers-help-small-businesses-grow',
        title: 'What SBA offers'
      },
      {
        link: '/loans-grants/see-what-sba-offers/sba-loan-programs',
        title: 'Loan programs'
      },
      {
        link: '/lendermatch',
        title: 'Connect with SBA lenders'
      }
    ]
    const sellLinks = [
      {
        link: '/contracting/getting-started-contractor',
        title: 'Is government contracting for me?'
      },
      {
        link: '/contracting/resources-small-businesses/government-contracting-classroom',
        title: 'Contracting classroom'
      },
      {
        link: '/size-standards',
        title: 'Qualify for government contracts'
      }
    ]
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <FrontPageHero hero={homepageJson.hero} button={homepageJson.buttons[0]} />
        </div>
        <div className={styles.sectionWithPadding}>
          <MenuTileCollection pathname={this.props.location.pathname} splitTitle />
          <HappeningNow />
        </div>
        <div className={styles.sectionWithPadding + ' ' + styles.last}>
          <Blog />
        </div>
      </div>
    )
  }
}

export default Homepage
