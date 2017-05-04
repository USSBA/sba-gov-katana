import React from "react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestContentActions from "../../../actions/rest-content.js"


import styles from "./lookup.scss";

class Lookup extends React.Component{
    render(){
        return (<div>Lookup Test</div>)
    }
}
function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Lookup);
