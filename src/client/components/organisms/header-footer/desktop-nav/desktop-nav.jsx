import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainLogo from "../../../atoms/main-logo/main-logo.jsx"
import MiniNav from "..//mini-nav/mini-nav.jsx";
import MainMenu from "../main-menu/main-menu.jsx";

import styles from './desktop-nav.scss';
import * as ContentActions from '../../../../actions/content.js';

class DesktopNav extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded('mainMenu', 'main-menu');
  }

  render() {
    return (
      <div className={styles.desktopNav}>
          <MainLogo/>
          <MiniNav/>
          <MainMenu data={this.props.mainMenuData}/>
      </div>
    );
  }
}

DesktopNav.defaultProps = {
  mainMenuData: null,
};

function mapStateToProps(reduxState) {
  return {mainMenuData: reduxState.contentReducer["mainMenu"]};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNav);
