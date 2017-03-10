import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MiniNav from "./mini-nav.jsx";
import MobileNav from "./mobile-nav.jsx";
import MainMenu from "./main-menu.jsx";

import styles from './header.scss';
import sbaLogo from '../../../../public/assets/images/logo.png';
import * as ContentActions from '../../actions/content.js';

class Header extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded('mainMenu', 'main-menu');
  }

  render() {

    return (
      <div>
        <div className="hidden-xs">
          <header className={styles.headerNew}>
            <div className={styles.navbarNew}>
              <a tabIndex="-1" href="/"><img className={styles.logoNew} alt="Small Business Administration" src={sbaLogo}/></a>
              <MiniNav/>
              <br/>
              <MainMenu data={this.props.mainMenuData} theme={this.props.theme}/>
            </div>
          </header>
        </div>
        <div className=" hidden-sm hidden-md hidden-lg">
          <div className={this.props.disaster.visible
            ? styles.mobileHeaderContainerNewWithDisasterCallout
            : styles.mobileHeaderContainerNew}>
            <MobileNav theme={this.props.theme}/>
          </div>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  disaster: {
    visible: false
  },
  mainMenuData: null
};

function mapStateToProps(reduxState) {
  return {mainMenuData: reduxState.contentReducer["mainMenu"], disaster: reduxState.contentReducer["disaster"]};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
