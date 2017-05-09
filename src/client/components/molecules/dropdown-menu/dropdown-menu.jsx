import React from 'react';
import styles from './dropdown-menu.scss';
import {isEmpty} from "lodash";

import PageLinkGroup from "../page-link-group/page-link-group.jsx"
import UtilityLink from "../../atoms/utility-link/utility-link.jsx"

class DropdownMenu extends React.Component {
  constructor(props) {
    super();
    this.state = {
      goToNextSectionShown: false
    };
  }

  highestLeafIndex = -1;

  handleGoToNextFocus(event) {
    event.preventDefault();
    this.setState({goToNextSectionShown: true});
  }

  handleGoToNextBlur(event) {
    event.preventDefault();
    this.setState({goToNextSectionShown: false});
  }

  handleSkipLinkKeyDown(event, menuIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code === 13) {
      this.props.onSkipToNext(event);
      event.preventDefault();
    }
  }

  handleLeafBlur(event, index) {
    if (index === this.highestLeafIndex && this.props.isLast) {
      this.props.onFinalBlur();
    }
  }

  render() {
    let sizingStyle = "";
    let menuId = this.props.menuId;
    if (menuId === 0) {
      sizingStyle = styles.one;
    }
    if (menuId === 1) {
      sizingStyle = styles.two;
    }
    if (menuId === 2) {
      sizingStyle = styles.three;
    }
    if (menuId === 3) {
      sizingStyle = styles.four;
    }
    if (menuId === 4) {
      sizingStyle = styles.five;
    }
    if (menuId === 5) {
      sizingStyle = styles.six;
    }

    if (!isEmpty(this.props.links)) {
      let pageLinkGroups = this.props.links.map((data, index) => {
        let children = data.children || [];
        let mappedChildren = children.map(function(item) {
          return {url: item.link, text: item.linkTitle}
        });
        return <PageLinkGroup key={index} title={data.linkTitle} titleLink={data.link} onBlur={this.handleLeafBlur.bind(this)} links={mappedChildren}/>;
      });
      const goToNextButton = this.props.hasNext
        ? <ul className={styles.skipLink}><UtilityLink visible={this.state.goToNextSectionShown} text="Go to Next Section" onKeyDown={(event) => this.handleSkipLinkKeyDown(event)} onFocus={(event) => this.handleGoToNextFocus(event)} onBlur={(event) => this.handleGoToNextBlur(event)}/></ul>
        : undefined;
      return (
        <ul key={1} aria-label="submenu" className={sizingStyle + " " + styles.dropdownMenu + " " + (this.props.shown
          ? styles.show
          : styles.hide)}>
          {goToNextButton}
          {pageLinkGroups}
        </ul>
      );
    } else {
      return <div/>;
    }
  }
}

DropdownMenu.defaultProps = {
  menuId: 0,
  shown: false,
  data: [],
  onSkipToNext: function() {},
  onFinalBlur: function() {}
}

export default DropdownMenu;
