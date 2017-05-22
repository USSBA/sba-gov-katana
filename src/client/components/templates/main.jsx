import React from 'react';
import Header from '../organisms/header-footer/header/header.jsx';
import Footer from '../organisms/header-footer/footer/footer.jsx';
import cookie from 'react-cookie';
import DisasterAlerts from '../organisms/header-footer/disaster-alerts.jsx'
import ModalController from '../modal-controller.jsx';

import styles from '../organisms/header-footer/header/header.scss';

class Main extends React.Component {
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
    this.setState({disasterAlertIsVisible: visible});
  }

  handleClose() {
    this.setState({disasterAlertIsVisible: false});
    cookie.save('close_disaster_loan_parature', '1', {
      path: '/',
      secure: true
    });
  }

  render() {
    return (
      <div className={this.state.disasterAlertIsVisible
        ? styles.alertIsActive
        : ""}>
        <DisasterAlerts disasterAlertIsVisible={this.state.disasterAlertIsVisible} onClose={this.handleClose.bind(this)}/>
        <Header/>
        <div className={styles.mainContent}>{this.props.children}</div>
        <Footer/>
        <ModalController/>
      </div>
    )
  }
}

export default Main;
