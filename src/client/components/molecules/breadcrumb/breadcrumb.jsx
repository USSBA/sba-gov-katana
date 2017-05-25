import React from 'react'
import styles from './breadcrumb.scss'
import {SmallIcon} from "../../atoms";
import _ from "lodash";

class Breadcrumb extends React.Component {
  makeLastAnchor(tail) {
    return (
      <span className={styles.last} key={20}>
        <a id="breadcrumb-current" href={tail.url+"/"}>{tail.title}</a>
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
          <SmallIcon fontAwesomeIconClassName="home" onClick={()=>{}}/>
          <span className={styles.slash}>/</span>
          {rest
            ? rest.map((item, index) => {
              return [(<a id={"breadcrumb-level"+index} href={item.url+"/"}>{item.title}</a>),(
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
