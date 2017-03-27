import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LocationChangeActions from '../../actions/location-change.js';

class Navigation extends React.Component {
  handleClick() {
    this.props.actions.locationChange('/linc/form');
  }
  render() {
    return (
      <div className="text-center">
        <Button onClick={ event => alert("you are not ready") }> Am I Ready?</Button>
        <Button id="landing-page-button-find-lenders" onClick={ this.handleClick.bind(this) }> Find Lenders</Button>
      </div>
      );
  }
  ;
}



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LocationChangeActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Navigation);
