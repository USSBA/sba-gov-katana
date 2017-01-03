import React from 'react';
import { StartYourBusinessSection } from './start-your-business.jsx';
import { FinanceYourBusinessSection } from './finance-your-business.jsx';
import { SellToGovtSection } from './sell-to-govt.jsx';
import HappeningNow from "./happening-now.jsx";

import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';
import PrimaryLanding from './primary-landing.jsx';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PrimaryLanding/>
        <StartYourBusinessSection />
        <FinanceYourBusinessSection/>
        <SellToGovtSection/>
        <HappeningNow />
        <Footer />
      </div>
    )
  }
}

export default Homepage;
