import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {indexOf} from 'lodash';

import * as LenderMatchActions from '../../../actions/lender-match.js';
import * as LocationChangeActions from '../../../actions/location-change.js';
import styles from '../../organisms/lender-match/form/lender-match.scss';
import ProgressBar from '../../atoms/progress-bar.jsx'

class LoanForm extends React.Component {
  getBackButtonText(locationIndex) {
    return locationIndex === 0
      ? "EXIT"
      : "BACK";
  }
  render() {
    let pages = [
      'contact',
      'business',
      'industry',
      'loan',
      'additional',
      'review'
    ]; // TODO make this static or configuration
    let page = this.props.location.replace('/linc/form/', '');
    let locationIndex = indexOf(pages, page);
    let backButton = locationIndex === 5
      ? ""
      : (
        <button type="button" className={styles.backBtn} onClick={this.props.locationActions.goBack}>
          {this.getBackButtonText(locationIndex)}
        </button>
      );
    let title = locationIndex === 5
      ? "Review and Submit"
      : "Lender Match";
    return (
      <div className={styles.formContainer}>
        <main className={styles.formPanel}>
          <h1 className={styles.title}>{title}</h1>
          <ProgressBar pages={pages.length + 1} locationIndex={locationIndex + 1}/> {this.props.children}
          {backButton}
        </main>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {location: ownProps.location.pathname};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(LoanForm);
