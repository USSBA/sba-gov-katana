import React, { Component } from 'react'
import { Router } from 'react-router'

class HaxRouter extends Component {
  componentDidMount() {
    // componentWillReceiveProps just whines about changing the routes prop so this shuts that up
    this.router.componentWillReceiveProps = () => {}
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.routes)
    if (prevProps.routes !== this.props.routes) {
      // tear down and set up router internals again
      this.router.componentWillUnmount()
      this.router.componentWillMount()
    }
  }

  render() {
    return (
      <Router
        ref={ref => (this.router = ref)}
        onUpdate={function() {
          // Use a basic anonymous function to get access to this.state.

          const {
            location: { hash, pathname }
          } = this.state // eslint-disable-line no-invalid-this
          const delay = 0

          if (hash !== '') {
            // Push onto callback queue so it runs after the DOM is updated,
            // this is required when navigating from a different page so that
            // the element is rendered on the page before trying to
            // getElementById.
            setTimeout(() => checkForHash(hash), delay)
          }

          function checkForHash(_hash) {
            const element = document.getElementById(_hash.replace('#', ''))

            if (element) {
              element.scrollIntoView()
            } else {
              // TODO: Implement intelligent retries.
              setTimeout(() => {
                checkForHash(_hash)
              }, delay)
            }
          }
        }}
        history={this.props.history}
      >
        {this.props.children}
      </Router>
    )
  }
}

export default HaxRouter
