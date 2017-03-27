import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LocationChangeActions from '../../actions/location-change.js';
import styles from '../../styles/buttons.scss';

class FindLendersButton extends React.Component {
  handleClick() {
    this.props.actions.locationChange('/linc/form/contact');
  }
  render() {
    return (
      <div>
        <Button block className={ styles.findLendersBtn } onClick={ this.handleClick.bind(this) }>FIND LENDERS</Button>
      </div>
      );
  }
}


function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LocationChangeActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(FindLendersButton);
