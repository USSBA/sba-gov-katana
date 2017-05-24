import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './disaster-alerts.scss'
import exitIcon from '../../../../../public/assets/svg/exit-modal-close.svg';
import * as ContentActions from "../../../actions/content.js";

class DisasterAlerts extends React.Component {

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded("disaster", "disaster");
  }

  render() {
    return (
      <div>
        { this.props.disasterAlertIsVisible && this.props.disaster.visible
          ? <div className={styles.wrapper}>
          <div className={ styles.alert }>
              <div className={ styles.alertIcon + " fa fa-exclamation-triangle" } aria-hidden="true"></div>
              <div className={ styles.disasterDescription }>
                { this.props.disaster.description }
              </div>
                <img className={ styles.alertClose } onClick={ this.props.onClose } src={ exitIcon } alt="Close" />
              <div><a href='https://disasterloan.sba.gov/ela/' title='Apply for disaster loan' className={ styles.alertButton }>APPLY FOR DISASTER LOAN</a></div>
            </div>
            </div>
          : null }
      </div>
    )
  }
}

DisasterAlerts.defaultProps = {
  disaster: {
    visible: true,
    description: "Have you been affected by the Louisiana Flooding?"
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
