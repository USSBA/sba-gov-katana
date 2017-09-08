import React from 'react';
import * as LoadingActions from '../../../actions/loading.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Homepage from "./homepage.jsx";

class HomepageContainer extends React.Component {

  componentDidMount() {
    this.props.actions.removeLoader();
  }

  render() {
    return (<Homepage/>);
  }
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoadingActions, dispatch)
  };
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(HomepageContainer);
