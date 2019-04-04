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
    if (this.props.id) {
      return this.fetchBlog(this.props.id)
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { id } = this.props
    const { id: nextId } = nextProps

    // Re-render the page with new blog data when we remain on `/blog`
    // and the BlogPage but the location has changed.
    if (id !== nextId) {
      return this.fetchBlog(nextId)
    }
  }

  fetchBlog(id) {
    if (id) {
      fetchSiteContent('blog', id)
        .then(data => this.setState({ data }))
        .catch(_ => this.setState({ data: null }))
    }
  }

  render() {
    const { id } = this.props
    const { data } = this.state

    if (id && data) {
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
