import React from "react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestContentActions from "../../../actions/rest-content.js"

import styles from "./lookup.scss";

class Lookup extends React.Component {

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded(this.props.type);
  }
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div>{this.props.items.map(function(item) {
                <p>item.name</p>
            })}</div>
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
  items:[]
}

function mapReduxStateToProps(reduxState, ownProps) {
    console.log(ownProps);
  return {items: reduxState.restContent[ownProps.type]};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Lookup);
