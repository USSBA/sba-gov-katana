import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
      data: {},
      LOADING_STATE: 'unloaded'
    }
  }

  componentDidMount() {
    if (this.props.id) {
      return this.fetchBlog(this.props.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props
    const { id: nextId } = nextProps

    // Re-render the page with new blog data when we remain on `/blog`
    // and the BlogPage but the location has changed.
    if (id !== nextId) {
      return this.fetchBlog(nextId)
    }
  }

  // fetchRestContent returns null when data is not found
  fetchBlog(id) {
    if (id) {
      this.setState(
        {
          LOADING_STATE: 'isLoading'
        },
        async () => {
          const data = await fetchRestContent(id)
          if (!isEmpty(data)) {
            data.author = await fetchRestContent(data.author)
          }
          this.setState({ data, LOADING_STATE: 'isLoaded' })
        }
      )
    }
  }

  render() {
    const { data, LOADING_STATE } = this.state

    return (
      <div>
        {LOADING_STATE === 'isLoading' && (
          <div className={styles.loaderContainer} data-testid={'blog-loader'}>
            <Loader />
          </div>
        )}
        {LOADING_STATE === 'isLoaded' && (
          <div>
            {!isEmpty(data) && !isEmpty(data.author) ? (
              <div data-testid={'blog-content'}>
                <Blog blogData={data} />
              </div>
            ) : (
              <div data-testid={'blog-error'}>
                <ErrorPage />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

BlogPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default BlogPage
