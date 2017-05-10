import React from 'react';
import styles from './sub-menu.scss';
import {isEmpty} from "lodash";

import SectionLink from "../../atoms/section-link/section-link.jsx"
import FeaturedCallout from "../featured-callout/featured-callout.jsx"
import DropdownMenu from "../dropdown-menu/dropdown-menu.jsx"

class SubMenu extends React.Component {

  handleFocus(event) {
    event.preventDefault();
    this.props.onFocus(this.props.menuId);
  }

  render() {
    let {data, ...rest} = this.props;
    const showTriangleMarker =data.children && !isEmpty(data.children);
    return (
      <li className={styles.subMenu} key={this.props.menuId} onFocus={(event) => this.handleFocus(event, this.props.menuId)} onMouseOut={this.props.onMenuMouseOut}>
        <SectionLink url={data.link} text={data.linkTitle} showTriangleMarker={showTriangleMarker} onMouseOver={this.props.onTitleMouseOver} onKeyDown={this.props.onSectionLinkKeyDown} >
          <DropdownMenu links={data.children} {...rest}/>
          {this.props.data.featuredCallout
            ? <FeaturedCallout {...data.featuredCallout}/>
            : undefined}
        </SectionLink>
      </li>
    );
  }
}

SubMenu.defaultProps = {
  menuId: 0,
  shown: false,
  data: [],
  columnDefintion: [],
  autoFocusOnTitle: false,
  onFocus: function() {},
  onSkipToNext: function() {},
  onFinalBlur: function() {},
  onTitleMouseOver: function() {},
  onMenuMouseOut: function() {},
  onSectionLinkKeyDown: function() {}
}
export default SubMenu;
