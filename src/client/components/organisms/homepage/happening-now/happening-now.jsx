import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Slider from '../../../atoms/carousel/carousel.jsx';
import SmallPrimaryButton from '../../../atoms/small-primary-button/small-primary-button.jsx';
import * as ContentActions from "../../../../actions/content.js";
import styles from "./happening-now.scss";

const contentProperty = "happeningNow";

class HappeningNow extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.actions.fetchContentIfNeeded(contentProperty, "frontpageslides");
  }

  makeDesktopItem(item, index, size) {
    let style = size === 3
      ? styles.itemDesktopThree
      : styles.itemDesktopFour;
    return (
      <div key={index} className={style}>
        <a href={item.url}>
          <img src={item.image} alt={item.imageAlt}></img>
        </a>
        <p className={styles.itemTitleDesktop}>
          {item.title}
        </p>
        <SmallPrimaryButton extraClassName={styles.buttonDesktop} url={item.url} text="LEARN MORE"/>
      </div>
    );
  }
  render() {
    let items = this.props.happeningNow || [];
    let size = items.length;

    if (size === 0) {
      return <div></div>;
    }

    let me = this;
    let title = "What's happening now.";
    return (
      <div className={styles.happeningNow}>
        <div className={styles.containerDesktop}>
          <h1 className={styles.titleDesktop}>{title}</h1>
          {items.map(function(item, index) {
            return me.makeDesktopItem(item, index, size);
          })}
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
