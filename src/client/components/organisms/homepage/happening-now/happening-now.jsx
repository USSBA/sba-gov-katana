import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './happening-now.scss'
import * as ContentActions from '../../../../actions/content'
import { BasicLink, Carousel, SmallPrimaryButton } from 'atoms'
import { eventCategories } from '../../../../services/constants'

const contentProperty = 'happeningNow'

class HappeningNow extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.actions.fetchContentIfNeeded(contentProperty, 'frontpageslides')
  }

  makeDesktopImage(item, index, desktopStyle) {
    return (
      <div className={desktopStyle} key={index}>
        <BasicLink url={item.url}>
          <img alt={item.imageAlt} src={item.image} />
        </BasicLink>
      </div>
    )
  }

  makeDeskopTitle(item, index, desktopStyle) {
    return (
      <div className={desktopStyle} key={index}>
        <p className={styles.itemTitleDesktop} key={index}>
          {item.title}
        </p>
      </div>
    )
  }
  makeDesktopButton(item, index, desktopStyle) {
    const buttonText = 'Learn more'.toUpperCase()
    return (
      <div key={index} className={desktopStyle}>
        <SmallPrimaryButton
          eventConfig={{
            category: [eventCategories.frontPage, 'Happening-Now'].join('-'),
            action: `Click: ${buttonText} ${index}`
          }}
          extraClassName={styles.buttonDesktop}
          key={index}
          text={buttonText}
          url={item.url}
        />
      </div>
    )
  }

  render() {
    let items = this.props.happeningNow || []
    let size = items.length

    if (size === 0) {
      return <div />
    }

    let desktopStyle = size === 3 ? styles.itemDesktopThree : styles.itemDesktopFour
    let me = this
    let title = "What's happening now."
    return (
      <div className={styles.container}>
        <div className={styles.containerDesktop}>
          <h2 className={styles.titleDesktop}>{title}</h2>
          <div>
            {items.map((item, index) => {
              return me.makeDesktopImage(item, index, desktopStyle)
            })}
          </div>
          <div key={2}>
            {items.map((item, index) => {
              return me.makeDeskopTitle(item, index, desktopStyle)
            })}
          </div>
          <div key={3}>
            {items.map((item, index) => {
              return me.makeDesktopButton(item, index, desktopStyle)
            })}
          </div>
        </div>
        <div className={styles.containerMobile}>
          <h2 className={styles.titleMobile}>{title}</h2>
          <div className={styles.itemsMobile}>
            <Carousel items={items} />
          </div>
        </div>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return { happeningNow: reduxState.contentReducer[contentProperty] }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export { HappeningNow }
export default connect(mapReduxStateToProps, mapDispatchToProps)(HappeningNow)
