import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as LoadingActions from '../../../actions/loading.js'

class RemoveMainLoader extends React.Component {
  //when this component mounts, it will fire an action that removes the main loader from main.jsx
  componentDidMount() {
    this.props.loadingActions.removeLoader()
  }

  render() {
    return <div />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadingActions: bindActionCreators(LoadingActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(RemoveMainLoader)
