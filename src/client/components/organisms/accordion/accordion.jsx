import React, { useState } from 'react'
import styles from './accordion.scss'

function Accordion(props) {
  const [isActive, setActive] = useState(false)
  const [setHeight, setHeightState] = useState('0px')
  const [setRotate, setRotateState] = useState('fa-chevron-down')

  const contentRef = React.useRef(null)

  function toggleAccordion() {
    setActive(!isActive)

    setHeightState(isActive && contentRef.current ? '0px' : `${contentRef.current.scrollHeight}px`)
    setRotateState(isActive ? 'fa-chevron-down' : 'fa-chevron-up')
  }

  return (
    <div className={styles.accordion__section}>
      <div className={`${styles.accordion} ${isActive ? styles.active : ''}`} onClick={toggleAccordion}>
        <p className={styles.accordion__title}>
          {props.title}
          <i className={styles.accordion__icon + ' fa ' + setRotate} />
        </p>
      </div>
      <div ref={contentRef} style={{ maxHeight: `${setHeight}` }} className={styles.accordion__content}>
        <div className={styles.accordion__text} dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </div>
  )
}

export default Accordion
