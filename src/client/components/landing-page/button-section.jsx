import React from 'react';
import {
  connect
}
from 'react-redux';
import {
  bindActionCreators
}
from 'redux';
import * as Sanders from '../../actions/navigation.js'

class ButtonSection extends React.Component {
  render() {
    return (
      <div>
            <button onClick={event => console.log("you are not ready")}> Am I Ready? </button>
            <button onClick={this.props.actions.findLenders}> Find Lenders </button> 
          </div>
    );
  };
}


function mapReduxStateToProps(reduxState) {
  return {};
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Sanders, dispatch)
  };
}

export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(ButtonSection);
