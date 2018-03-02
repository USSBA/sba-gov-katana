import React from 'react'
import * as LoadingActions from '../../../actions/loading.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Homepage from './homepage.jsx'

class HomepageContainer extends React.Component {
  componentDidMount() {
    this.props.actions.removeLoader()
  }

  render() {
    // the location property no longer needs to be shared with Homepage and MenuTileCollection components once sba-blue-dark becomes the primary color
    return <Homepage location={this.props.location} />
  }
}

function mapReduxStateToProps(reduxState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoadingActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(HomepageContainer)
