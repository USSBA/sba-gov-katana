import React from 'react';
import { StartYourBusinessSection } from './start-your-business.jsx';
import { FinanceYourBusinessSection } from './finance-your-business.jsx';
import { SellToGovtSection } from './sell-to-govt.jsx';

import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <StartYourBusinessSection />
        <FinanceYourBusinessSection />
        <SellToGovtSection />
        <Footer />
      </div>
    )
  }
}

export default Homepage;
