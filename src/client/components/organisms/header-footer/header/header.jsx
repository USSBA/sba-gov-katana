import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import DesktopNav from "../desktop-nav/desktop-nav.jsx";
import MobileNav from "../mobile-nav/mobile-nav.jsx";
import * as ContentActions from '../../../../actions/content.js';

import styles from './header.scss';

class Header extends React.Component {

    componentWillMount() {
        this.props.actions.fetchContentIfNeeded('mainMenu', 'main-menu');
    }
  render() {
    return (
      <nav className={styles.navbar}>
          <MobileNav mainMenuData={this.props.mainMenuData}/>
          <DesktopNav mainMenuData={this.props.mainMenuData} theme={this.props.theme}/>
      </nav>
    );
  }
}

Header.defaultProps = {
    mainMenuData: null
};

function mapStateToProps(reduxState) {
    return {mainMenuData: reduxState.contentReducer["mainMenu"], theme: reduxState.display.theme};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ContentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
