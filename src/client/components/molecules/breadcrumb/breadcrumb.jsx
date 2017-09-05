import React from "react";
import styles from "./breadcrumb.scss";
import {SmallIcon, BasicLink} from "atoms";
import _ from "lodash";

class Breadcrumb extends React.Component {
  makeLastAnchor(tail) {
    return (
      <span className={styles.last} key={20}>
        <BasicLink id={"breadcrumb-current"} text={tail.title} url={tail.url}/>
      </span>
    );
  }
  render() {
    if (this.props.items && this.props.items.length > 0) {
      let tail = _.last(this.props.items);
      let tailAnchor = this.makeLastAnchor(tail);
      let rest = _.take(this.props.items, this.props.items.length - 1);
      return (
        <div>
          <SmallIcon fontAwesomeIconClassName="home" onClick={() => {}}/>
          <span className={styles.slash}>/</span>
          {rest
            ? rest.map((item, index) => {
              return [(<BasicLink id={"breadcrumb-level" + index} text={item.title} url={item.url}/>), (
                  <span className={styles.slash}>/</span>
                )];
            })
            : <div/>}
          {tailAnchor}
        </div>
      );

    } else {
      return (
        <div></div>
      )
    }
  }
}

export default Breadcrumb;
