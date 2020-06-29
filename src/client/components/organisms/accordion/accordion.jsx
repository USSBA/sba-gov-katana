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
        <p className={styles.accordionTitle}>
          {props.title}
          <i className={styles.accordionIcon + ' fa ' + setRotate} />
        </p>
      </div>
      <div ref={contentRef} style={{ maxHeight: `${setHeight}` }} className={styles.accordionContent}>
        <div className={styles.accordionText} dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </div>
  )
}

export default Accordion
