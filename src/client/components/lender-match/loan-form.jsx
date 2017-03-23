import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LenderMatchActions from '../../actions/lender-match.js';
import { indexOf, chain, startCase } from 'lodash';
import { Panel, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import lenderMatchStyles from './lender-match.scss';
import { browserHistory } from 'react-router';
import styles from './lender-match.scss';
import { ProgressBar } from './progress-bar.jsx'

const BackButton = ({text}) => <button type="button" className={ styles.backBtn } onClick={ browserHistory.goBack }>
                                 { text }
                               </button>;


class LoanForm extends React.Component {
  getBackButtonText(locationIndex) {
    return locationIndex === 0 ? "EXIT" : "BACK";
  }
  render() {
    let pages = ['contact', 'business', 'industry', 'loan', 'additional', 'review']; // TODO make this static or configuration
    let page = this.props.location.replace('/linc/form/', '');
    let locationIndex = indexOf(pages, page);
    let backButton = locationIndex === 5 ? "" : (<BackButton text={ this.getBackButtonText(locationIndex) } />);
    return (
      <div className={ styles.formContainer }>
        <main className={ styles.formPanel }>
          <h1 className={ styles.title }>Lender Match</h1>
          <ProgressBar pages={ pages.length + 1 } locationIndex={ locationIndex + 1 } />
          { this.props.children }
          { backButton }
        </main>
      </div>
      );
  }
  ;
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    location: ownProps.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(LoanForm);
