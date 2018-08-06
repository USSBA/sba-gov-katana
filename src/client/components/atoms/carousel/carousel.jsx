import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles.scss'
import { Link } from 'atoms'

var Slider = React.createClass({
  getDefaultProps() {
    return {
      loop: false,
      selected: 0,
      navIsClickable: false,
      showNav: true
    }
  },

  getInitialState() {
    return {
      dragStart: 0,
      dragStartTime: new Date(),
      index: 0,
      lastIndex: 0,
      transition: false
    }
  },

  componentWillMount() {
    const { selected } = this.props

    this.setState({
      index: selected,
      lastIndex: selected
    })
  },

  componentWillReceiveProps(nextProps) {
    const { selected } = this.props

    if (selected !== nextProps.selected) {
      this.goToSlide(nextProps.selected)
    }
  },

  getDragX(event, isTouch) {
    return isTouch ? event.touches[0].pageX : event.pageX
  },

  handleDragStart(event, isTouch) {
    const x = this.getDragX(event, isTouch)

    this.setState({
      dragStart: x,
      dragStartTime: new Date(),
      transition: false,
      slideWidth: ReactDOM.findDOMNode(this.refs.slider).offsetWidth
    })
  },

  handleDragMove(event, isTouch) {
    const { dragStart, lastIndex, slideWidth } = this.state

    const x = this.getDragX(event, isTouch)
    const offset = dragStart - x
    const percentageOffset = offset / slideWidth
    const newIndex = lastIndex + percentageOffset
    const SCROLL_OFFSET_TO_STOP_SCROLL = 30

    // Stop scrolling if you slide more than 30 pixels
    if (Math.abs(offset) > SCROLL_OFFSET_TO_STOP_SCROLL) {
      event.stopPropagation()
      event.preventDefault()
    }

    this.setState({
      index: newIndex
    })
  },

  handleDragEnd() {
    const { items } = this.props
    const { dragStartTime, index, lastIndex } = this.state

    const timeElapsed = new Date().getTime() - dragStartTime.getTime()
    const offset = lastIndex - index
    const velocity = Math.round(offset / timeElapsed * 10000)

    let newIndex = Math.round(index)

    if (Math.abs(velocity) > 5) {
      newIndex = velocity < 0 ? lastIndex + 1 : lastIndex - 1
    }

    if (newIndex < 0) {
      newIndex = items.length
    } else if (newIndex >= items.length) {
      newIndex = 0
    }

    this.setState({
      dragStart: 0,
      index: newIndex,
      lastIndex: newIndex,
      transition: true
    })
  },

  goToSlide(index, event) {
    const { items, loop, navIsClickable } = this.props

    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (navIsClickable) {
      if (index < 0) {
        index = loop ? items.length - 1 : 0
      } else if (index >= items.length) {
        index = loop ? 0 : items.length - 1
      }

      this.setState({
        index: index,
        lastIndex: index,
        transition: true
      })
    }
  },

  renderNav() {
    const { items, navIsClickable } = this.props
    const { lastIndex } = this.state

    const nav = items.map((slide, i) => {
      const buttonClasses =
        i === lastIndex
          ? styles.SliderNavButton + ' ' + styles.SliderNavButtonActive
          : styles.SliderNavButton
      return <button className={buttonClasses} key={i} onClick={event => this.goToSlide(i, event)} />
    })

    return <div className={styles.SliderNav}>{nav}</div>
  },

  makeItem(item, index) {
    return (
      <div key={'slider-item-' + (index + 1)}>
        <Link to={item.url}>
          <img className={styles.SliderItemImage} src={item.image} alt={item.imageAlt} />
        </Link>
      </div>
    )
  },

  makeChildrenFromItems(items) {
    // in order to create the wrap around effect, we need to create a copy of the last element
    // before the first, and the first element after the last
    const children = items.map(this.makeItem)
    const newFirstItem = this.makeItem(items[items.length - 1], -1)
    const newLastItem = this.makeItem(items[0], items.length)
    const childrenLoopable = [newFirstItem].concat(children.slice(0)).concat([newLastItem])
    return childrenLoopable
  },

  calculateTotalWidth(numberOfChildren) {
    return numberOfChildren * 75 + (numberOfChildren - 1) * 4.2
  },

  calculateTranslation(numberOfChildren, index) {
    return -1 * (numberOfChildren === 6 ? 14 : 16.5) + -1 * index * (100 / numberOfChildren)
  },

  render() {
    const { items, showNav, navIsClickable } = this.props

    const { index, transition } = this.state

    const children = this.makeChildrenFromItems(items)

    const slidesStyles = {
      width: `${this.calculateTotalWidth(children.length)}%`,
      transform: `translateX(${this.calculateTranslation(children.length, index)}%)`
    }
    const slidesClasses = transition
      ? styles.SliderSlides + ' ' + styles.SliderSlidesTransition
      : styles.SliderSlides

    const activeItem = items[index]

    return (
      <div className={styles.Slider} ref="slider">
        <div
          className={styles.SliderInner}
          onTouchStart={event => this.handleDragStart(event, true)}
          onTouchMove={event => this.handleDragMove(event, true)}
          onTouchEnd={() => this.handleDragEnd(true)}
        >
          <div className={slidesClasses} style={slidesStyles}>
            {children}
          </div>
          <Link className={styles.SliderItemAnchor} to={activeItem.url}>
            <p className={styles.SliderItemTitle}>{activeItem.title}</p>
          </Link>
        </div>
        {showNav ? this.renderNav() : null}
      </div>
    )
  }
})

export default Slider
