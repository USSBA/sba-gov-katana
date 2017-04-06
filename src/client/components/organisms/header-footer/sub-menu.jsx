import React from 'react';
import styles from './main-menu.scss';
import { isEmpty, includes } from "lodash";
/* esfmt-ignore-start */
class SubMenu extends React.Component {

  constructor(props) {
    super();
    this.state = {
      goToNextSectionShown: false
    };
  }

  highestLeafIndex = -1;

  handleFocus(event) {
    event.preventDefault();
    this.props.onFocus(this.props.menuId);
  }

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
      this.props.onSkipToNext(this.props.menuId, event);
      event.preventDefault();
    }
  }

  handleLeafBlur(event, index) {
    if (index === this.highestLeafIndex && this.props.isLast) {
      this.props.onFinalBlur();
    }
  }

  makeFeaturedCalled(featuredCallout) {
    return (
      <ul key={13} className={styles.columnNew}>
        <div className={styles.menuCallToAction}>
          <a href={featuredCallout.target} title={featuredCallout.title}>
            <img src={featuredCallout.image} alt={featuredCallout.text} title={featuredCallout.title}/>
            <p>
              {featuredCallout.text}
            </p>
          </a>
        </div>
      </ul>
    );
  }

  makeSubMenuTitle(item, index) {
    if (index > this.highestLeafIndex) {
      this.highestLeafIndex = index;
    }
    return (
      <li key={index}>
        <h2>
          <a tabIndex="0" href={item.link} onBlur={(event) => this.handleLeafBlur(event, index)}>{item.linkTitle}</a>
        </h2>
      </li>
    );
  }

  makeLeafMenu(leafMenuData, leafIndex) {
    if (leafIndex > this.highestLeafIndex) {
      this.highestLeafIndex = leafIndex;
    }
    return (
      <li key={leafIndex}>
        <a tabIndex="0" href={leafMenuData.link} onBlur={(event) => this.handleLeafBlur(event, leafIndex)}>
          {leafMenuData.linkTitle}
        </a>
      </li>
    );
  }

  makeSubMenuElement(subMenuData, subMenuIndex) {
    let me = this;
    let title = this.makeSubMenuTitle(subMenuData, subMenuIndex * 10);
    let children = [];
    if (subMenuData.children && !isEmpty(subMenuData.children)) {
      children = subMenuData.children.map((data, index) => {
        let leafIndex = (subMenuIndex * 10) + index + 1;
        return me.makeLeafMenu(data, leafIndex);
      });
    }

    return [title].concat(children);
  }

  makeColumn(submenus, columnIndex) {
    let items = _.flatten(submenus);
    return (
      <ul key={columnIndex} className={styles.columnNew}>
        {items}
      </ul>
    );
  }

  makeSubMenu(columns) {
    if (!isEmpty(columns)) {

      const goToNextButton = this.props.isLast
        ? ""
        : (
          <li key={0} className={styles.skipLink + " " + (this.state.goToNextSectionShown
            ? styles.showVisible
            : styles.hideVisible)} onKeyDown={(event) => this.handleSkipLinkKeyDown(event)} onFocus={(event) => this.handleGoToNextFocus(event)} onBlur={(event) => this.handleGoToNextBlur(event)}>
            <a tabIndex="0">Go to Next Section</a>
          </li>
        );
      return (
        <ul key={1} aria-label="submenu" className={styles.mainMenuNew + " " + (this.props.shown
          ? styles.show
          : styles.hide)}>
          {goToNextButton}
          <li key={1} className={styles.normalizeMenuItemNew}>
            {columns}
          </li>
        </ul>
      );
    } else {
      return undefined;
    }

  }

  sliceSubMenusIntoColumns(subMenus) {
    return this.props.columnDefintion.map((columnLength, index) => {
      let subMenusForColumn = _.pullAt(subMenus, _.range(columnLength));
      return this.makeColumn(subMenusForColumn, index);
    });
  }

  buildDropdown(children, featuredCalloutData) {
    let columns = [];
    if (children && !isEmpty(children)) {
      let subMenus = children.map((data, index) => {
        return this.makeSubMenuElement(data, index);
      });
      columns = this.sliceSubMenusIntoColumns(subMenus);
    }

    /// if a featuredCallout is defined, add it to the last column
    let featuredCallout = featuredCalloutData
      ? this.makeFeaturedCalled(featuredCalloutData)
      : undefined;
    if (featuredCallout) {
      columns.push(featuredCallout);
    }

    // create the submenu dropdown component
    return this.makeSubMenu(columns);
  }

  render() {
    let dropdown = this.buildDropdown(this.props.data.children, this.props.data.featuredCallout);
    const triangleMarker = !this.props.data.children || isEmpty(this.props.data.children)
      ? ""
      : (
        <div className={styles.triangleNew}></div>
      );
    return (
      <li key={this.props.menuId} onFocus={(event) => this.handleFocus(event, this.props.menuId)}>
        <a tabIndex="0" aria-haspopup="true" title={this.props.data.linkTitle} className={styles.mainBtnNew + " " + styles.normalizeMenuItemNew} href={this.props.data.link}>
          <span>{this.props.data.linkTitle}</span>
          {triangleMarker}
        </a>
        {dropdown}
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
  onFinalBlur: function() {}
}
export default SubMenu;
/* esfmt-ignore-end */
