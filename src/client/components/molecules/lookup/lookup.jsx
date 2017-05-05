import React from "react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestContentActions from "../../../actions/rest-content.js"

import styles from "./lookup.scss";
import states from "../../../services/us-states.json";

class Lookup extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded(this.props.type);
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h4 className={styles.title}>{this.props.title}</h4>
          <div className={styles.selectContainer}>
            <select>
              {states.map(function(state) {
                return (
                  <option>{state.name}</option>
                );
              })}
            </select>
          </div>
          <div className={styles.dataContainer}>{this.props.items.map(function(item) {
              return (
                <p>
                  {JSON.stringify(item)}
                </p>
              );
            })}</div>
        </div>
      </div>
    )
  }
}

Lookup.propTypes = {
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  display: React.PropTypes.string
}

Lookup.defaultProps = {
  title: "Lookup Title",
  type: "contacts",
  display: "cards",
  items: []
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    items: reduxState.restContent[ownProps.type]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Lookup);
