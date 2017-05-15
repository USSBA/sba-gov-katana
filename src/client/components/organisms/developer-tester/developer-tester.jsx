import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from "./developer-tester.scss";

import MultiSelect from '../../atoms/multiselect/multiselect.jsx';
import chevron from "../../../../../public/assets/svg/chevron.svg";
import _ from "lodash";

export class DeveloperTester extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "Han"
    }
  }

  handleSelectChange(newValue) {
    console.log("newValue", newValue);
  }

  handleIndustryTypeBlur() {}
  handleFocus() {}

  render() {

    let myOptions = _.map([
      "Han", "Luke", "Leia", "JarJar"
    ], (x) => {
      return {label: x, value: x};
    });
    let myprops = {
      errorText: "Error Message",
      label: "Who is your favorite?",
      name: "starwars",
      onChange: this.handleSelectChange.bind(this),
      validationState: "",
      value: this.state.value,
      options: myOptions,
      onBlur: this.handleIndustryTypeBlur.bind(this),
      autoFocus: true,
      multi: false,
      onFocus: this.handleFocus.bind(this)
    };
    return (
      <div className={styles.container}>
        <MultiSelect {...myprops}></MultiSelect>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(DeveloperTester);
