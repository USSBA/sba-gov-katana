import React from 'react'
import { isEmpty } from 'lodash'
import classNames from 'classnames'

import styles from './dropdown-menu.scss'
import clientConfig from '../../../services/client-config'
import constants from '../../../services/constants'
import { Link, Button, UtilityLink } from 'atoms'
import { PageLinkGroup } from 'molecules'
import { determineMainMenuTitleLink, getLanguageOverride } from '../../../services/utils'
import { TEN_STEPS_CALLOUTS_TRANSLATIONS } from '../../../translations'

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goToNextSectionShown: false
    }
  }

  highestLeafIndex = -1

  handleGoToNextFocus(event) {
    event.preventDefault()
    this.setState({ goToNextSectionShown: true })
  }

  handleGoToNextBlur(event) {
    event.preventDefault()
    this.setState({ goToNextSectionShown: false })
  }

  handleSkipLinkKeyDown(event, menuIndex) {
    let code = event.keyCode ? event.keyCode : event.which
    if (code === 13) {
      this.props.onSkipToNext(event)
      event.preventDefault()
    }
  }

  render() {
    const {
      featuredCallout,
      hasNext,
      id,
      links,
      menuId,
      onFinalBlur,
      shown,
      target,
      text,
      title
    } = this.props

    let sizingStyle = ''
    let indent = false
    let shouldShowCallToAction = false

    if (menuId === 0) {
      sizingStyle = styles.one
      shouldShowCallToAction = true
    }
    if (menuId === 1) {
      sizingStyle = featuredCallout ? styles.twoWithFeaturedCallout : styles.two
      indent = featuredCallout ? false : true
    }
    if (menuId === 2) {
      sizingStyle = styles.three
    }
    if (menuId === 3) {
      sizingStyle = styles.four
    }
    if (menuId === 4) {
      sizingStyle = clientConfig.localAssistMenuHeight ? styles.fiveTallLocalAssistMenuHeight : styles.five
    }
    if (menuId === 5) {
      sizingStyle = styles.six
    }

    const ulStyles = classNames({
      [sizingStyle]: true,
      [styles.dropdownMenu]: true,
      [styles.show]: shown,
      [styles.hide]: !shown
    })

    if (!isEmpty(links)) {
      const langCode = getLanguageOverride(true)
      let pageLinkGroups = links.map((data, index) => {
        let children = data.children || []
        let mappedChildren = children.map(function(item) {
          const childTitleLinkData = determineMainMenuTitleLink(langCode, item)
          return {
            url: childTitleLinkData.link,
            text: childTitleLinkData.linkTitle
          }
        })

        const isLastGroup = index === links.length - 1 && !shouldShowCallToAction
        const titleLinkData = determineMainMenuTitleLink(langCode, data)
        return (
          <PageLinkGroup
            key={index}
            id={id + '-group-' + index}
            title={titleLinkData.linkTitle}
            titleLink={titleLinkData.link}
            isLastGroup={isLastGroup}
            onFinalBlur={onFinalBlur.bind(this)}
            links={mappedChildren}
            indent={indent}
          />
        )
      })

      const goToNextButton = hasNext ? (
        <ul className={styles.skipLink}>
          <UtilityLink
            id={id + '-go-to-next'}
            visible={this.state.goToNextSectionShown}
            text="Go to Next Section"
            onKeyDown={event => this.handleSkipLinkKeyDown(event)}
            onFocus={event => this.handleGoToNextFocus(event)}
            onBlur={event => this.handleGoToNextBlur(event)}
          />
        </ul>
      ) : (
        <ul className={styles.skipLink}>
          <UtilityLink
            id={id + '-go-to-main-content'}
            visible={this.state.goToNextSectionShown}
            text="Go to Main Content"
            onKeyDown={event => {
              if (event.keyDown === 13) {
                location.href = '#main-content'
              }
            }}
            onFocus={event => this.handleGoToNextFocus(event)}
            onBlur={event => this.handleGoToNextBlur(event)}
          />
        </ul>
      )

      const { headline, linkText } = TEN_STEPS_CALLOUTS_TRANSLATIONS['navigation'][langCode]

      return (
        <ul id={id} key={1} aria-label="submenu" className={ulStyles}>
          {goToNextButton}
          {pageLinkGroups}
          {featuredCallout ? (
            <div className={styles.featuredCallout}>
              <Link to={target} title={title}>
                <img src="/assets/image/disaster.png" alt={text} title={title} />
                <p>{text}</p>
              </Link>
            </div>
          ) : null}
          {shouldShowCallToAction ? (
            <div className={styles.callToAction}>
              <h6>{headline}</h6>
              <Button children={linkText} url={constants.routes.tenSteps} secondary />
            </div>
          ) : null}
        </ul>
      )
    } else {
      return <div />
    }
  }
}

DropdownMenu.defaultProps = {
  menuId: 0,
  shown: false,
  data: [],
  onSkipToNext: function() {},
  onFinalBlur: function() {}
}

export default DropdownMenu
