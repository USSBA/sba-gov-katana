import React, { PropTypes } from 'react'
import path from 'path'
import { isEmpty, isString, startsWith } from 'lodash'
import { Link as ReactRouterLink } from 'react-router'

import config from '../../../services/client-config'

const Link = props => {
  const { children, to, ...nativeProps } = props

  if (!to) {
    // Make sure the link is still tabbable.
    return (
      <a href="javascript:;" {...nativeProps}>
        {children}
      </a>
    )
  }

  const location = isString(to) ? to : to.pathname

  if (/^https?:\/\//.test(location)) {
    // We must use an <a> for an external link.
    return (
      <a href={to} {...nativeProps}>
        {children}
      </a>
    )
  }

  const redirectPaths = config.katanaRedirectPaths

  // If the link does not point to a url that can be handled by React Router,
  // i.e. a non-D8 url
  if (
    startsWith(location, '/') &&
    // TODO: This check simply exists to block code path for jest tests when
    // client config is undefined.
    !isEmpty(redirectPaths) &&
    !redirectPaths.includes(location.split('/')[1])
  ) {
    // Adding a `target` forces react-router to send a request to the server.
    return <ReactRouterLink target="_self" {...props} />
  } else {
    return <ReactRouterLink {...props} />
  }
}

export default Link
