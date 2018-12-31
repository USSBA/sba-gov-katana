import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'

import s from './main-loader.scss'
import * as LoadingActions from '../../../actions/loading.js'
import { Loader } from 'atoms'

class MainLoader extends React.Component {
  componentDidMount() {
    // if the current pathname doesn't equal the next location pathname
    // show loader

    browserHistory.listenBefore(location => {
      if (window.location.pathname !== location.pathname) {
        this.props.loadingActions.showLoader()
      }
    })
  }

  shouldLoaderDisplay() {
    const allowedPages = ['', 'business-guide']
    const currentPagePath = window.location.pathname.split('/')[1]
    return this.props.displayLoader !== false && allowedPages.includes(currentPagePath)
  }

  render() {
    return (
      <div>
        {this.shouldLoaderDisplay() ? (
          <div className={s.loaderContainer}>
            <Loader />
          </div>
        ) : null}
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    displayLoader: reduxState.loading.displayLoader
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadingActions: bindActionCreators(LoadingActions, dispatch)
  }
}

MainLoader.propTypes = {
  displayLoader: PropTypes.bool
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(MainLoader)
