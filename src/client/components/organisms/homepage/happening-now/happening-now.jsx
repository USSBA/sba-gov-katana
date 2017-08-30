import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  Slider,
  SmallPrimaryButton
} from "atoms";
import * as ContentActions from "../../../../actions/content.js";
import styles from "./happening-now.scss";
import {createNavigation} from "../../../../services/navigation";

const contentProperty = "happeningNow";


class HappeningNow extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.actions.fetchContentIfNeeded(contentProperty, "frontpageslides");
  }

  makeDesktopImage(item, index, desktopStyle) {
    return (
      <div key={index} className={desktopStyle}>
        <a onTouchTap={createNavigation(item.url)}>
          <img src={item.image} alt={item.imageAlt}></img>
        </a>
      </div>
    );
  }

  makeDeskopTitle(item, index, desktopStyle) {
    return (
      <div key={index} className={desktopStyle}>
        <p className={styles.itemTitleDesktop} key={index}>
          {item.title}
        </p>
      </div>
    );
  }
  makeDesktopButton(item, index, desktopStyle) {
    return (
      <div key={index} className={desktopStyle}><SmallPrimaryButton key={index} extraClassName={styles.buttonDesktop} url={item.url} text="LEARN MORE"/></div>
    );
  }

  render() {
    let items = this.props.happeningNow || [];
    let size = items.length;

    if (size === 0) {
      return <div></div>;
    }

    let desktopStyle = size === 3
      ? styles.itemDesktopThree
      : styles.itemDesktopFour;
    let me = this;
    let title = "What's happening now.";
    return (
      <div className={styles.container}>
        <div className={styles.containerDesktop}>
          <h2 className={styles.titleDesktop}>{title}</h2>
          <div >
            {items.map((item, index) => {
              return me.makeDesktopImage(item, index, desktopStyle)
            })}
          </div>
          <div key={2}>
            {items.map((item, index) => {
              return me.makeDeskopTitle(item, index, desktopStyle)
            })}
          </div>
          <div key={3}>
            {items.map((item, index) => {
              return me.makeDesktopButton(item, index, desktopStyle)
            })}
          </div>
        </div>
        <div className={styles.containerMobile}>
          <h2 className={styles.titleMobile}>{title}</h2>
          <div className={styles.itemsMobile}>
            <Slider items={items}/>
          </div>
        </div>
      </div>
    );

  }

}

function mapReduxStateToProps(reduxState) {
  return {happeningNow: reduxState.contentReducer[contentProperty]};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(HappeningNow);
