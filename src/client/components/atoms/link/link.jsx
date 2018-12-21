import React, { PropTypes } from 'react'
import path from 'path'
import { isEmpty, isString, startsWith } from 'lodash'
import { Link as ReactRouterLink } from 'react-router'

import config from '../../../services/client-config'

const Link = (props, context) => {
  const { router } = context
  const { children, forceClientRouting, to, ...nativeProps } = props

  // TODO: https://stackoverflow.com/a/1830980
  /* eslint-disable no-script-url */
  if (!to) {
    // Make sure the link is still tabbable.
    return (
      <a href="javascript:;" {...nativeProps}>
        {children}
      </a>
    )
  }
  /* eslint-enable no-script-url */

  let href = isString(to) ? to : router.createHref(to)

  if (/^https?:\/\//.test(href)) {
    // We must use an <a> for an external link.
    return (
      <a href={href} {...nativeProps}>
        {children}
      </a>
    )
  }

  if (startsWith(href, '#')) {
    // Prepend the pathname to the hash fragment.
    href = `${router.createHref(router.getCurrentLocation().pathname)}${href}`
  }

  const linkElement = <ReactRouterLink children={children} {...nativeProps} to={href} />
  const redirectPaths = config.katanaRedirectPaths

  // If the link does not point to a url that can be handled by React Router,
  // i.e. a non-D8 url
  if (
    // TODO: For now, route all links through the server, since client-side
    // routing will be removed in the future.
    !forceClientRouting ||
    (startsWith(href, '/') &&
      // TODO: This check simply exists to block code path for jest tests when
      // client config is undefined.
      !isEmpty(redirectPaths) &&
      !redirectPaths.includes(href.split('/')[1]))
  ) {
    // Adding a `target` forces react-router to send a request to the server.
    return React.cloneElement(linkElement, { target: '_self' })
  } else {
    return linkElement
  }
}

Link.contextTypes = {
  router: PropTypes.object
}

Link.defaultProps = {
  forceClientRouting: false
}

Link.propTypes = {
  // Force client-side routing, except for urls that are not defined in katanaRedirectPaths.
  forceClientRouting: PropTypes.bool,

  // A url to a linked resource or location.
  to: PropTypes.oneOfType([
    PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }),
    PropTypes.string
  ])
}

export default Link
