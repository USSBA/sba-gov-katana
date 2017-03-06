import React from 'react';
import { StartYourBusinessSection } from './start-your-business.jsx';
import { FinanceYourBusinessSection } from './finance-your-business.jsx';
import { SellToGovtSection } from './sell-to-govt.jsx';
import HappeningNow from "./happening-now.jsx";
import styles from '../common/header.scss';

import DisasterAlerts from '../common/disaster-alerts.jsx'
import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';
import PrimaryLanding from './primary-landing.jsx';

import Blog from './blog.jsx';
import ModalController from '../common/modal-controller.jsx';

class Homepage extends React.Component {
  render() {
    return (
      <div className={ styles['sba-blue'] }>
        <DisasterAlerts/>
        <Header/>
        <PrimaryLanding/>
        <HappeningNow/>
        <StartYourBusinessSection/>
        <FinanceYourBusinessSection/>
        <SellToGovtSection/>
        <Blog/>
        <Footer/>
        <ModalController/>
      </div>
    )
  }
}

export default Homepage;
