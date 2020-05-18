// docs can be found here http://react-responsive-carousel.js.org/storybook/index.html?path=/story/01-basic--base
import React from 'react'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './styles.scss'

const SimpleCarousel = props => {
  return (
    <Carousel
      className={styles.carouselOverride}
      showThumbs={false}
      infiniteLoop={true}
      useKeyboardArrows={true}
      showStatus={false}
    >
      {React.Children.map(props.children, slide => {
        return React.cloneElement(slide, { className: styles.slide })
      })}
    </Carousel>
  )
}

export default SimpleCarousel
