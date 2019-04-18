import React, { Component, PropTypes } from 'react'
import { AuthorCard } from 'molecules'
import styles from './blog.scss'

class Blog extends Component {
  render() {
    return (
    	<div className={styles.container}>
        	<p>{JSON.stringify(this.props.blogData)}</p>
        	<div>
        		<AuthorCard />
        	</div>
        </div>
    )
  }
}

Blog.defaultProps = {
  blogData: null
}

Blog.propTypes = {
  blogData: PropTypes.object
}

export default Blog
