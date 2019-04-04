import React, { Component, PropTypes } from 'react'
import { isEmpty } from 'lodash'

import { fetchSiteContent } from '../../../fetch-content-helper'
import { Loader } from 'atoms'
import ErrorPage from '../error-page/error-page.jsx'
import Blog from '../../templates/blog/blog.jsx'

class BlogPage extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    const {
      location: { pathname }
    } = this.props
    await this.fetchBlog(pathname)
  }

  async componentWillReceiveProps(nextProps) {
    const {
      location: { pathname }
    } = this.props
    const {
      location: { pathname: nextPathname }
    } = nextProps

    // Re-render the page with new blog data when we remain on `/blog`
    // and the BlogPage but the location has changed.
    if (pathname !== nextPathname) {
      await this.fetchBlog(nextPathname)
    }
  }

  fetchBlog(pathname) {
    if (pathname) {
      fetchSiteContent('blog', { url: pathname })
        .then(data => this.setState({ data }))
        .catch(_ => this.setState({ data: null }))
    }
  }

  render() {
    const {
      location: { pathname }
    } = this.props
    const { data } = this.state

    if (pathname && data !== null) {
      if (!isEmpty(data)) {
        return <Blog blogData={data} />
      } else {
        return (
          <div>
            <Loader />
          </div>
        )
      }
    } else {
      return <ErrorPage />
    }
  }
}

BlogPage.defaultProps = {
  location: null
}

BlogPage.propTypes = {
  location: PropTypes.object
}

export default BlogPage
