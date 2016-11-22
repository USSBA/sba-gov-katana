import React from 'react';
import {
    connect
}
    from 'react-redux';
import {
    bindActionCreators
}
    from 'redux';

import { push } from 'react-router-redux';
import { browserHistory } from 'react-router'

class ButtonSection extends React.Component {
  render() {
    return (
        <div>
          <button onClick={event => console.log("you are not ready")}> Am I Ready?</button>
          <button onClick={event => browserHistory.push('/form')}> Find Lenders</button>
        </div>
    );
  };
}


function mapReduxStateToProps(reduxState) {
  return {};
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(ButtonSection);
