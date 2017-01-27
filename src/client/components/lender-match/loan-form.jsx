import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoanActions from '../../actions/loan-form.js';
import Steps from 'react-steps';
import { indexOf, chain, startCase } from 'lodash';
import { Panel, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import lenderMatchStyles from '../../styles/lender-match/lender-match.scss';
import { browserHistory } from 'react-router';
import styles from '../common/styles.scss';

const BackButton = ({text}) => <ButtonToolbar>
                                 <button type="button" className={ lenderMatchStyles.backBtn + " btn btn-default btn-sm pull-left" } onClick={ browserHistory.goBack }>
                                   <Glyphicon glyph="chevron-left" />
                                   { text }
                                 </button>
                               </ButtonToolbar>;

class LoanForm extends React.Component {
  getBackButtonText(locationIndex) {
    return locationIndex === 0 ? "Exit" : "Back";
  }
  render() {
    let pages = ['contact', 'business', 'industry', 'loan', 'additional', 'review']; // TODO make this static or configuration
    let page = this.props.location.replace('/linc/form/', '');
    let locationIndex = indexOf(pages, page);
    let data = chain(pages).slice(0, 5).map(function(item, index) {
      return {
        text: startCase(item),
        isActive: locationIndex === index,
        isDone: locationIndex > index
      };
    }).value();
    let backButton = locationIndex === 5 ? "" : (<BackButton text={ this.getBackButtonText(locationIndex) } />);
    return (
      <div className="container-fluid">
        <Steps items={ data } type={ 'point' } />
        <Panel className={ "col-xs-12 col-md-6 col-md-offset-3 " + styles.formPanel }>
          { backButton }
          { this.props.children }
        </Panel>
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
    actions: bindActionCreators(LoanActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(LoanForm);
