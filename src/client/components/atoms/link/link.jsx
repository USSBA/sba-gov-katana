import React, { PropTypes } from 'react'
import path from 'path'
import { isEmpty, isString, startsWith } from 'lodash'
import { Link as ReactRouterLink } from 'react-router'

import config from '../../../services/client-config'

const Link = (props, context) => {
  const { router } = context
  const { children, to, ...nativeProps } = props

  if (!to) {
    // Make sure the link is still tabbable.
    return (
      <a href="javascript:;" {...nativeProps}>
        {children}
      </a>
    )
  }

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
  return React.cloneElement(linkElement, { target: '_self' })
}

Link.contextTypes = {
  router: PropTypes.object
}

Link.propTypes = {

  // A url to a linked resource or location.
  to: PropTypes.oneOfType([
    PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }),
    PropTypes.string
  ])
}

export default Link
