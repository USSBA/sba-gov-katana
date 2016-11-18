import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Sanders from '../../actions/landing-page-buttons.js'

class ButtonSection extends React.Component{
    render(){
        return (
          <div>
            <button onClick={this.props.actions.makeReady}> Am I Ready? </button>
            <button onClick={this.props.actions.findLenders}> Find Lenders </button> 
          </div>
      );
    };
}


function mapReduxStateToProps(reduxState) {
  return {
  };
}


function mapDispatchToProps(dispatch) {
  return{
    actions: bindActionCreators(Sanders, dispatch)
  };
}

export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(ButtonSection);

