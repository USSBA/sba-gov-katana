import React from 'react'
import { isEmpty } from 'lodash'

import styles from './dropdown-menu.scss'
import { Link, Button, UtilityLink } from 'atoms'
import { PageLinkGroup } from 'molecules'
import clientConfig from '../../../services/client-config.js'
import constants from '../../../services/constants.js'

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
      sizingStyle = styles.five
    }
    if (menuId === 5) {
      sizingStyle = styles.six
    }

    if (!isEmpty(links)) {
      let pageLinkGroups = links.map((data, index) => {
        let children = data.children || []
        let mappedChildren = children.map(function(item) {
          return { url: item.link, text: item.linkTitle }
        })

        const isLastGroup = index === links.length - 1 && !shouldShowCallToAction

        return (
          <PageLinkGroup
            key={index}
            id={id + '-group-' + index}
            title={data.linkTitle}
            titleLink={data.link}
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
      return (
        <ul
          id={id}
          key={1}
          aria-label="submenu"
          className={styles.dropdownMenu + ' ' + sizingStyle + ' ' + (shown ? styles.show : styles.hide)}
        >
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
              <h6>Not sure where to start? Start your business in 10 steps.</h6>
              <Button children="See the guide" url={constants.routes.tenSteps} secondary />
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
