import React from 'react';
import { StartYourBusinessSection } from './start-your-business.jsx';
import { FinanceYourBusinessSection } from './finance-your-business.jsx';
import { SellToGovtSection } from './sell-to-govt.jsx';
import HappeningNow from "./happening-now.jsx";

import DisasterAlerts from '../common/disaster-alerts.jsx'
import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';
import PrimaryLanding from './primary-landing.jsx';

import Blog from './blog.jsx';
import ModalController from '../common/modal-controller.jsx';
import cookie from 'react-cookie';

class Homepage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      disasterAlertIsVisible: false
    };
  }

  componentWillMount() {
    let visible = cookie.load('close_disaster_loan_parature')
      ? false
      : true;
    this.setState({
      disasterAlertIsVisible: visible
    });
  }

  handleClose() {
    this.setState({
      disasterAlertIsVisible: false
    });
    cookie.save('close_disaster_loan_parature', '1', {
      path: '/',
      secure: true
    });
  }

  render() {
    return (
      <div>
        <DisasterAlerts disasterAlertIsVisible={ this.state.disasterAlertIsVisible } onClose={ this.handleClose.bind(this) } />
        <Header theme="sba-blue" disasterAlertIsVisible={ this.state.disasterAlertIsVisible } />
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
