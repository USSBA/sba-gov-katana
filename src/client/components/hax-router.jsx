import React, { Component } from 'react'
import { Router } from 'react-router'

class HaxRouter extends Component {

  componentDidMount() {
    // componentWillReceiveProps just whines about changing the routes prop so this shuts that up
    this.router.componentWillReceiveProps = function() {}
  }

  componentDidUpdate(prevProps) {
    if (prevProps.routes != this.props.routes) {
      // tear down and set up router internals again
      this.router.componentWillUnmount()
      this.router.componentWillMount()
    }
  }

  render() {
    return <Router ref={ ref => this.router = ref } onUpdate={ this.props.onUpdate } history={ this.props.history }>
             { this.props.children }
           </Router>
  }
}

export default HaxRouter;
