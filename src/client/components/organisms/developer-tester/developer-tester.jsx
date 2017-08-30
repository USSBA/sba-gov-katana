import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./developer-tester.scss";

import { Loader } from "../../atoms/index.js";
import _ from "lodash";

export class DeveloperTester extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Loader />
      </div>
    );
  }
}

const Divider = (props) => {
  return(
    <div className={styles.divider}> COMPONENT DIVIDER  </div>
  )
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(
  DeveloperTester
);
