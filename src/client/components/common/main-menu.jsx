import React from 'react';
import styles from './main-menu.scss';
import { isEmpty, includes } from "lodash";
/*esfmt-ignore-start*/
class MainMenu extends React.Component {
  menuHtml = [];

  constructor(props) {
    super();
    this.state = {
      tabbedIndex: -1,
      tabbedSubSubMenuIndex: -1,
      tabbedSubMenuIndex: -1
    };
  }

  handleKeyUp(event, linkIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code === 9) {
      this.setState({tabbedIndex: linkIndex});
    }
  }

  handleSubSubMenuKeyUp(event, subMenuLinkIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code === 9) {
      this.setState({tabbedSubSubMenuIndex: subMenuLinkIndex});
    }
  }

  handleSubMenuKeyUp(event, subMenuLinkIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code === 9) {
      this.setState({tabbedSubMenuIndex: subMenuLinkIndex});

    }
  }

  handleSkipLinkKeyDown(event, menuIndex) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);

    if (code === 13) {
      if (menuIndex < this.menuHtml.length - 1) {
        this.menuHtml[menuIndex + 1].focus();
        this.setState({
          tabbedIndex: this.state.tabbedIndex + 1
        });
      }
    }
  }

  makeFeaturedCalled(featuredCallout) {
    return (
      <ul className={styles.columnNew}>
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

  buildMenu(menuData) {
    let menuContainer = [];
    let menuChildrenArray = [];
    let subMenuChildrenArray = [];
    const endColumnLinks = [
      '/starting-business',
      '/managing-business',
      '/loans-grants/connect-sba-lenders',
      '/loans-grants/find-other-sources-financing',
      '/contracting/resources-small-businesses',
      '/contracting/government-contracting-programs',
      '/contracting/contracting-officials',
      '/tools/local-assistance',
      '/about-sba/sba-performance',
      '/about-sba/oversight-advocacy'
    ];

    menuData.forEach((mainMenu, index) => {
      let subMenuContainer = [];

      if (mainMenu.children && !isEmpty(mainMenu.children)) {
        let subSubMenuContainer = [];
        menuChildrenArray = mainMenu.children.slice();
        mainMenu.children.forEach((subMenu, subMenuIndex) => {
          subSubMenuContainer.push(
            <li>

              <h2>
                <a tabIndex="0" href={subMenu.link}>{subMenu.linkTitle}</a>
              </h2>
            </li>
          );
          if (subMenu.children && !isEmpty(subMenu.children)) {
            subMenuChildrenArray = subMenu.children.slice();
            subMenu.children.forEach((subSubMenu, subSubMenuIndex) => {

              if (!subSubMenu.invisble) {
                subSubMenuContainer.push(
                  <li key={index + "-" + subMenuIndex + "-" + subSubMenuIndex} onKeyUp={(event) => this.handleSubSubMenuKeyUp(event, subSubMenuIndex)}>
                    <a tabIndex="0" href={subSubMenu.link}>
                      {subSubMenu.linkTitle}
                    </a>
                  </li>
                );
              }
            });

          }

          let endColumn = includes(endColumnLinks, subMenu.link) || (subMenuIndex === mainMenu.children.length - 1);
          if (endColumn) {
            subMenuContainer.push(
              <ul key={index + "-" + subMenuIndex} className={styles.columnNew} onKeyUp={(event) => this.handleSubMenuKeyUp(event, subMenuIndex)}>
                {subSubMenuContainer}
              </ul>
            );
            subSubMenuContainer = [];
          }

        });
      }
      let featuredCallout = mainMenu.featuredCallout
        ? this.makeFeaturedCalled(mainMenu.featuredCallout)
        : undefined;
      if (featuredCallout) {
        subMenuContainer.push(featuredCallout);
      }

      let subMenu = "";

      if (!isEmpty(subMenuContainer)) {
        if (this.state.tabbedIndex !== -1 && this.state.tabbedIndex === index) {
          if (this.state.tabbedIndex === menuData.length - 1) {
            subMenu = (
              <ul aria-label="submenu" className={styles.mainMenuNew + " " + styles.show}>
                <li className={styles.normalizeMenuItemNew}>
                  {subMenuContainer}
                </li>
              </ul>
            );
          } else {
            subMenu = (
              <ul aria-label="submenu" className={styles.mainMenuNew + " " + styles.show}>
                <li className={styles.skipLink} onKeyDown={(event) => this.handleSkipLinkKeyDown(event, index)}>
                  <a tabIndex="0">Go to Next Section</a>
                </li>
                <li className={styles.normalizeMenuItemNew}>
                  {subMenuContainer}
                </li>
              </ul>
            );
          }
        } else {
          subMenu = (
            <ul aria-label="submenu" className={styles.mainMenuNew + " " + styles.hide}>
              <li className={styles.normalizeMenuItemNew}>
                {subMenuContainer}
              </li>
            </ul>
          );
        }
      }

      if ((this.state.tabbedIndex === menuData.length - 1)) {
        if (this.state.tabbedSubMenuIndex === menuChildrenArray.length - 1) {
          let noChildren = isEmpty(menuChildrenArray.children);
          if (noChildren || this.state.tabbedSubSubMenuIndex === subMenuChildrenArray.length - 1) {

            subMenu = (
              <ul aria-label="submenu" className={styles.mainMenuNew + " " + styles.hide}>
                <li className={styles.normalizeMenuItemNew}>
                  {subMenuContainer}
                </li>
              </ul>
            );

          }
        }
      }
      const triangleMarker = isEmpty(subMenuContainer)
        ? ""
        : (
          <div className={styles.triangleNew}></div>
        );
      menuContainer.push(
        <li key={index} onKeyUp={(event) => this.handleKeyUp(event, index)}>
          <a tabIndex="0" aria-haspopup="true" title={mainMenu.linkTitle} ref={(htmlMenu) => {
            this.menuHtml[index] = htmlMenu
          }} className={styles.mainBtnNew + " " + styles.normalizeMenuItemNew} href={mainMenu.link}>
            <span>{mainMenu.linkTitle}</span>
            {triangleMarker}
          </a>
          {subMenu}
        </li>
      );

    });
    return menuContainer;
  }

  render() {
    let menuContainer = [];
    if (this.props.mainMenuData) {
      menuContainer = this.buildMenu(this.props.mainMenuData);
    } else {
      menuContainer.push(
        <div></div>
      );
    }

    return (
      <nav role="menubar" aria-label="main navigation bar with dropdown submenus" className={styles.mainNavNew + " " + styles[this.props.theme]}>
        <ul className="reverse-ul">
          {menuContainer}
        </ul>
      </nav>
    );
  }
}
export default MainMenu;
/*esfmt-ignore-end*/
