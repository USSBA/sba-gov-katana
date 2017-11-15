import React from 'react'
import _ from 'lodash'

import { createNavigation } from '../../../services/navigation'

class BasicLink extends React.Component {
  componentDidMount() {
    if (this.props.autoFocus && this.me.focus) {
      this.me.focus()
    }
  }

  createKeypressHandler(onClick) {
    return event => {
      if (event.key === 'Enter') {
        onClick()
      }
    }
  }

  render() {
    const {
      onClick,
      url,
      text,
      myClassName,
      htmlElement,
      eventConfig,
      children,
      ...linkProps
    } = this.props
    if (onClick) {
      _.merge(linkProps, {
        onTouchTap: onClick,
        onKeyPress: this.createKeypressHandler(onClick)
      })
    } else {
      _.merge(linkProps, {
        onTouchTap: createNavigation(url, eventConfig),
        onKeyPress: this.createKeypressHandler(
          createNavigation(url, eventConfig)
        )
      })
    }
    _.merge(linkProps, { className: myClassName })
    if (htmlElement === 'button') {
      return (
        <button
          {...linkProps}
          ref={me => {
            this.me = me
          }}
        >
          {text}
        </button>
      )
    } else {
      if (htmlElement !== 'a') {
        console.log(
          'WARNING: BasicLink told to render an unexpected element with htmlElement prop. Rendering <a instead'
        )
      }
      return (
        <a
          {...linkProps}
          ref={me => {
            this.me = me
          }}
        >
          {text || children}
        </a>
      )
    }
  }
}

BasicLink.propTypes = {
  url: React.PropTypes.string,
  onClick: React.PropTypes.func,
  tabIndex: React.PropTypes.string,
  text: React.PropTypes.string,
  myClassName: React.PropTypes.string,
  htmlElement: React.PropTypes.string,
  autoFocus: React.PropTypes.bool,
  eventConfig: React.PropTypes.object
}

BasicLink.defaultProps = {
  tabIndex: '0',
  text: '',
  htmlElement: 'a',
  myClassName: '',
  autoFocus: false,
  eventConfig: null //Google Analytics event hash
}

export default BasicLink
