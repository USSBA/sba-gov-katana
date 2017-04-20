import React from 'react';

import { StartYourBusinessSection } from '../organisms/homepage/start-your-business.jsx';
import { FinanceYourBusinessSection } from '../organisms/homepage/finance-your-business.jsx';
import { SellToGovtSection } from '../organisms/homepage/sell-to-govt.jsx';
import HappeningNow from "../organisms/homepage/happening-now.jsx";
import PrimaryLanding from '../organisms/homepage/primary-landing.jsx';
import Blog from '../organisms/homepage/blog.jsx';


class Homepage extends React.Component {
  render() {
    return (
      <div>
        <PrimaryLanding/>
        <HappeningNow/>
        <StartYourBusinessSection/>
        <FinanceYourBusinessSection/>
        <SellToGovtSection/>
        <Blog/>
      </div>
    )
  }
}

export default Homepage;
