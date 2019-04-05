import React, { Component, PropTypes } from 'react'

class Blog extends Component {
  render() {
    return <p>{JSON.stringify(this.props.blogData)}</p>
  }
}

Blog.defaultProps = {
  blogData: null
}

Blog.propTypes = {
  blogData: PropTypes.object
}

export default Blog
