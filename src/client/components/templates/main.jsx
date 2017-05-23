import React from 'react';
import Header from '../organisms/header-footer/header/header.jsx';
import Footer from '../organisms/header-footer/footer/footer.jsx';
import cookie from 'react-cookie';
import DisasterAlerts from '../organisms/header-footer/disaster-alerts.jsx'
import ModalController from '../modal-controller.jsx';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../actions/content.js";

import styles from '../organisms/header-footer/header/header.scss';

class Main extends React.Component {
  constructor(props) {
    super();
    this.state = {
      disasterAlertIsVisible: false
    };
  }

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded("disaster", "disaster", {});
  }

  componentWillMount() {
    let visible = cookie.load('close_disaster_loan_parature') === '1'
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
    let showDisasterAlert = this.props.disaster.visible && this.state.disasterAlertIsVisible;
    let disasterAlertClass = showDisasterAlert ? styles.alertIsActive : "";
    return (
      <div className={disasterAlertClass}>
        <DisasterAlerts visible={showDisasterAlert} text={this.props.disaster.description} onClose={this.handleClose.bind(this)}/>
        <Header/>
        <div className={styles.mainContent}>{this.props.children}</div>
        <Footer/>
        <ModalController/>
      </div>
    )
  }
}

Main.defaultProps = {
  disaster: {
    visible: false,
    description: ""
  }
}

function mapReduxStateToProps(reduxState) {
  return {disaster: reduxState.contentReducer["disaster"]};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Main);
