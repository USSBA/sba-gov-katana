import React from 'react';
import Header from '../organisms/header-footer/header/header.jsx';
import Footer from '../organisms/header-footer/footer/footer.jsx';
import cookie from 'react-cookie';
import DisasterAlerts from '../organisms/header-footer/disaster-alerts.jsx'
import ModalController from '../modal-controller.jsx';
import * as ContentActions from "../../actions/content.js";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../organisms/header-footer/header/header.scss';

class Main extends React.Component {
  constructor(props) {
    super();
    this.state = {
      disasterAlertHidingCookieIsPresent: false
    };
  }

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded("disaster", "disaster");
  }

  componentWillMount() {
    let cookieValue = cookie.load('close_disaster_loan_parature');
    let hidingCookie = cookieValue
      ? true
      : false;
    this.setState({disasterAlertHidingCookieIsPresent: hidingCookie});
  }

  handleClose() {
    this.setState({disasterAlertHidingCookieIsPresent: true});
    cookie.save('close_disaster_loan_parature', '1', {
      path: '/',
      secure: true
    });
  }

  render() {
    let visible = this.props.disasterAlertVisible && !this.state.disasterAlertHidingCookieIsPresent;
    return (
      <div className={visible
        ? styles.alertIsActive
        : ""}>
        <DisasterAlerts description={this.props.disasterAlertDescription} visible={visible} onClose={this.handleClose.bind(this)}/>
        <Header/>
        <div className={styles.mainContent}>{this.props.children}</div>
        <Footer/>
        <ModalController/>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  let data = reduxState.contentReducer["disaster"];
  if (data) {
    return {disasterAlertVisible: data.visible, disasterAlertDescription: data.description};
  } else {
    return {};
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Main);
