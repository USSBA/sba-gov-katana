import React from 'react';
import {
  FrontPageLady,
  HappeningNow,
  FrontPageHero,
  Blog
} from "organisms";
import styles from "./homepage.scss";
import MainLoaderTrigger from "../../molecules/main-loader/main-loader-trigger.jsx"

class Homepage extends React.Component {
  render() {
    let startLinks = [
      {
        link: "/starting-business/how-start-business/10-steps-starting-business",
        title: "10 steps to get started"
      }, {
        link: "/tools/local-assistance#locations-page",
        title: "Find local mentoring and support"
      }, {
        link: "/tools/business-plan/1?from_mobile=true",
        title: "Create a business plan"
      }
    ];
    let financeLinks = [
      {
        link: "/loans-grants/see-what-sba-offers/what-sba-offers-help-small-businesses-grow",
        title: "What SBA offers"
      }, {
        link: "/loans-grants/see-what-sba-offers/sba-loan-programs",
        title: "Loan programs"
      }, {
        link: "/lendermatch",
        title: "Connect with SBA lenders"
      }
    ];
    let sellLinks = [
      {
        link: "/contracting/getting-started-contractor",
        title: "Is government contracting for me?"
      }, {
        link: "/contracting/resources-small-businesses/government-contracting-classroom",
        title: "Contracting classroom"
      }, {
        link: "/tools/size-standards-tool",
        title: "Qualify for government contracts"
      }
    ];
    return (
      <div className={styles.container}>
        <MainLoaderTrigger />
        <div className={styles.section}><FrontPageLady/></div>
        <div className={styles.sectionWithPadding}><HappeningNow/></div>
        <div className={styles.section}><FrontPageHero color="purple" title="Start your business." image="assets/images/homepage/start-image.jpg" imageAlt="Start your own business." links={startLinks}/></div>
        <div className={styles.section}><FrontPageHero reverse color="green" title="Finance your business." image="assets/images/homepage/finance.jpg" imageAlt="Finance your business." links={financeLinks}/></div>
        <div className={styles.section}><FrontPageHero color="blue" title="Sell to the government." image="assets/images/homepage/contract.jpg" imageAlt="Sell to the government." links={sellLinks}/></div>
        <div className={styles.sectionWithPadding + " " + styles.last}>
          <Blog/>
        </div>
      </div>
    )
  }
}

export default Homepage;
