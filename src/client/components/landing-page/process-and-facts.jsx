import React from 'react';
import { connect } from 'react-redux';

class ProcessAndFacts extends React.Component{
    render(){
      return (
        <div>
          <h1> This is a ProcessAndFacts </h1>
          <div> I am {this.props.ready ? "" : "not"} ready </div>
        </div> 
      );
    };
}


function mapReduxStateToProps(reduxState) {
  console.log("The new reduxState is " + JSON.stringify(reduxState));
  return {
    ready: reduxState.ready
  };
}

function mapDispatchToProps(dispatch) {
  return{
  };
}


export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(ProcessAndFacts);