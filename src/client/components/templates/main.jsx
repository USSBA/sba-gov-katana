import React from 'react';
import Header from '../organisms/header-footer/header/header.jsx';
import Footer from '../organisms/header-footer/footer/footer.jsx';
import cookie from 'react-cookie';
import Waypoint from 'react-waypoint';
import DisasterAlerts from '../organisms/header-footer/disaster-alerts.jsx'
import ModalController from '../modal-controller.jsx';

class Main extends React.Component {
  constructor(props) {
    super();
    this.state = {
      disasterAlertIsVisible: false,
      userHasScrolledPastAlert: true
    };
  }

  componentWillMount() {
    let visible = cookie.load('close_disaster_loan_parature')
      ? false
      : true;
    this.setState({disasterAlertIsVisible: visible});
  }

  handleClose() {
    this.setState({disasterAlertIsVisible: false});
    cookie.save('close_disaster_loan_parature', '1', {
      path: '/',
      secure: true
    });
  }

  handleWaypointLeave() {
    this.setState({userHasScrolledPastAlert: true});
  }

  handleWaypointEnter() {
    this.setState({userHasScrolledPastAlert: false});
  }

  render() {
    return (
      <div>
        <DisasterAlerts disasterAlertIsVisible={this.state.disasterAlertIsVisible} onClose={this.handleClose.bind(this)}/>
        <Waypoint onEnter={this.handleWaypointEnter.bind(this)} onLeave={this.handleWaypointLeave.bind(this)}/>
        <Header theme="sba-blue" disasterAlertIsVisible={this.state.disasterAlertIsVisible} userHasScrolledPastAlert={this.state.userHasScrolledPastAlert}/>
        {this.props.children}
        {/* <Footer/> */}
        <ModalController/>
      </div>
    )
  }
}

export default Main;
