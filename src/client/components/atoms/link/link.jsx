import React, { PropTypes } from 'react'
import path from 'path'
import { startsWith } from 'lodash'
import { Link as ReactRouterLink } from 'react-router'

import config from '../../../services/client-config'

const Link = props => {
  const { to } = props
  const redirectPaths = config.katanaRedirectPaths

  // If the link is relative does not point to a url handled by React Router,
  // i.e. a non-D8 url
  if (
    !startsWith(to, 'http') &&
    Array.isArray(redirectPaths) &&
    redirectPaths.includes(
      path
        .dirname(to)
        .split('/')
        .pop()
    )
  ) {
    // Adding a `target` forces react-router to send a request to the server.
    return <ReactRouterLink target="_self" {...props} />
  }

  return <ReactRouterLink {...props} />
}

export default Link
