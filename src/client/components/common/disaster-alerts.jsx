import React from 'react';
import styles from '../../styles/disaster-alerts.scss'
import cookie from 'react-cookie';
import exitIcon from '../../../../public/assets/svg/exit-modal-close.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContentActions from "../../actions/content.js";


class DisasterAlerts extends React.Component {
  componentWillMount() {
    this.state = {
      isVisible: (cookie.load('close_disaster_loan_parature') ? false : true),
    }
  }

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded("disaster", "disaster", {});
  }

  handleClose() {
    this.setState({
      isVisible: false
    });
    cookie.save('close_disaster_loan_parature', '1', {
      path: '/',
      secure: true
    });
  }

  render() {
    return (
      <div>
        { this.state.isVisible && this.props.disaster.visible
          ? <div className={ styles.applyForDisasterLoanParatureWrapper }>
              <div className={ styles.disasterLoanParature }>
                <div className={ styles.triangleIcon + " fa fa-exclamation-triangle" } aria-hidden="true"></div>
                <div className={ styles.disasterDescription }>
                  { this.props.disaster.description }
                </div>
                <a href='https://disasterloan.sba.gov/ela/' title='Apply for disaster loan' className={ styles.disasterBtn }>APPLY FOR DISASTER LOAN</a>
                <div className={ styles.disasterLoanParatureClose } onClick={ this.handleClose.bind(this) }>
                  <img className={ styles.closeIcon } src={ exitIcon } alt="Close" />
                </div>
              </div>
            </div>
          : null }
      </div>
    )
  }
}

DisasterAlerts.defaultProps = {
  disaster: {
    visible: false,
    description: ""
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    disaster: reduxState.contentReducer["disaster"]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(DisasterAlerts);
