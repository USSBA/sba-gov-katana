import React, { Component, PropTypes } from 'react'
import { isEmpty } from 'lodash'

import { fetchRestContent } from '../../../fetch-content-helper'
import { Loader } from 'atoms'
import ErrorPage from '../error-page/error-page.jsx'
import Blog from '../../templates/blog/blog.jsx'
import styles from './blog-page.scss'

class BlogPage extends Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
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

  // fetchRestContent returns null when data is not found
  async fetchBlog(id) {
    if (id) {
      const data = await fetchRestContent('node', id)
      if (!isEmpty(data)) {
        data.author = await fetchRestContent('node', data.author)
      }
      this.setState({data})
    }
  }

  render() {
    const { data } = this.state

    if (data) {
      if (!isEmpty(data)) {
        return (
          <div data-testid={'blog-content'}>
            <Blog blogData={data} />
          </div>
        )
      } else {
        return (
          <div className={styles.loaderContainer} data-testid={'blog-loader'}>
            <Loader />
          </div>
        )
      }
    } else {
      return (
        <div data-testid={'blog-error'}>
          <ErrorPage />
        </div>
      )
    }
  }
}

BlogPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default BlogPage
