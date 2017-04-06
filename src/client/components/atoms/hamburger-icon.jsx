import React from 'react';
import styles from "./hamburger-icon.scss";

class HamburgerIcon extends React.Component {

  getOpen() {
    return (
      <div>
        <svg className={styles.menuIconCloseNew} width="27px" height="27px" viewBox="0 0 27 27" version="1.1">
          <title>Close Button</title>
          <desc>Created with Sketch.</desc>
          <defs/>
          <g id="Style-Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <g id="Close-Button" fill="#333333">
              <g id="Group">
                <rect className={styles.closeIcon} id="Rectangle-7" transform="translate(13.081475, 13.081475) rotate(45.000000) translate(-13.081475, -13.081475) " x="11.5814755" y="-3.91852455" width={3} height={34} rx={2}/>
                <rect className={styles.closeIcon} id="Rectangle-7" transform="translate(13.081475, 13.081475) scale(-1, 1) rotate(45.000000) translate(-13.081475, -13.081475) " x="11.5814755" y="-3.91852455" width={3} height={34} rx={1}/>
              </g>
            </g>
          </g>
        </svg>
      </div>
    )
  }

  getClosed() {
    return (
      <div>
        <svg className={styles.menuIconHamburgerNew} width="15px" height="13px" viewBox="0 0 15 13">
          <title>hamburger icon</title>
          <desc>Created with Sketch.</desc>
          <defs/>
          <g id="Homepage" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <g id="alert-mobile" transform="translate(-337.000000, -128.000000)" fill="#0B97DD">
              <g id="Rectangle-14-+-whitepaper-Copy-11" transform="translate(274.000000, 116.000000)">
                <path className={styles.hamburgerIcon} d="M78,22.4318182 C78,22.0962358 77.7167969,21.8181818 77.375,21.8181818 L63.625,21.8181818 C63.2832031,21.8181818 63,22.0962358 63,22.4318182 L63,23.6590909 C63,23.9946733 63.2832031,24.2727273 63.625,24.2727273 L77.375,24.2727273 C77.7167969,24.2727273 78,23.9946733 78,23.6590909 L78,22.4318182 Z M78,17.5227273 C78,17.1871449 77.7167969,16.9090909 77.375,16.9090909 L63.625,16.9090909 C63.2832031,16.9090909 63,17.1871449 63,17.5227273 L63,18.75 C63,19.0855824 63.2832031,19.3636364 63.625,19.3636364 L77.375,19.3636364 C77.7167969,19.3636364 78,19.0855824 78,18.75 L78,17.5227273 Z M78,12.6136364 C78,12.278054 77.7167969,12 77.375,12 L63.625,12 C63.2832031,12 63,12.278054 63,12.6136364 L63,13.8409091 C63,14.1764915 63.2832031,14.4545455 63.625,14.4545455 L77.375,14.4545455 C77.7167969,14.4545455 78,14.1764915 78,13.8409091 L78,12.6136364 Z" id="hamburger-icon"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );

  }

  getText(open) {
    return <div className={styles.menuBtnTextNew}>{open
        ? "Close"
        : "MENU"}</div>;
  }

  render() {
    return (
      <div>
        {this.getText(this.props.isOpen)}
        {this.props.isOpen
          ? this.getOpen()
          : this.getClosed()}
      </div>
    );
  }
}

export default HamburgerIcon;
