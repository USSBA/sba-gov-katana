import React, { PropTypes } from 'react'

import styles from './callout.scss'
import { Button } from 'atoms'

const Callout = ({ buttons, inHeroWithNoImage, message, title }) => (
  <div className={`callout ${styles.callout}`}>
    <h1>{title}</h1>
    <h5>{message}</h5>
    {buttons && (
      <div className={!inHeroWithNoImage && styles.buttons}>
        {buttons.map((item, index) => (
          <Button
            key={index}
            primary={index === 0}
            secondary={index > 0}
            spacing={!!inHeroWithNoImage}
            url={item.url}
          >
            {item.btnText}
          </Button>
        ))}
      </div>
    )}
  </div>
)

React.propTypes = {
  buttons: PropTypes.array
}

export default Callout
