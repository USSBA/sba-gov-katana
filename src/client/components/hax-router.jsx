import React, {Component} from 'react'
import {Router} from 'react-router'

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

  checkForHash(hash) {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    console.log("element", element)
    if (element) {
      element.scrollIntoView();
    } else {
      setTimeout(()=>{this.checkForHash(hash)}, 400);
    }
  }

  handleUpdate() {
    const {hash} = window.location;
    if (hash !== '') {
      console.log("hash", hash)
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(()=>this.checkForHash(hash), 400);
    }
  }

  render() {
    return (
      <Router ref={ref => this.router = ref} onUpdate={this.handleUpdate.bind(this)} history={this.props.history}>
        {this.props.children}
      </Router>
    )
  }
}

export default HaxRouter;
