import React from 'react'

import styles from './callout.scss'
import { Button, DecorativeDash } from 'atoms'

class Callout extends React.Component {
  render() {
    let calloutStyles = styles.callout
    let buttonStyles = styles.button

    if (this.props.inHeroWithNoImage) {
      calloutStyles += ' ' + styles.noDecoration
      buttonStyles += ' ' + styles.noFloat + ' ' + styles.wideButtons
    }

    return (
      <div className={`callout ${calloutStyles}`}>
        <h1 className={`callout-title ${styles.title}`}>{this.props.title}</h1>
        <h5 className={`callout-message ${styles.message}`}>{this.props.message}</h5>
        <div className={`callout-buttons ${styles.buttonContainer}`}>
          <div className={`callout-button ${buttonStyles}`}>
            {this.props.buttons.map((item, index) => {
              if (item.btnType === 'LargePrimaryButton') {
                return (
                  <Button primary url={item.url}>
                    {item.btnText}
                  </Button>
                )
              } else if (item.btnType === 'LargeInversePrimaryButton') {
                return (
                  <Button primary url={item.url}>
                    {item.btnText}
                  </Button>
                )
              } else if (item.btnType === 'LargeInverseSecondaryButton') {
                return (
                  <Button secondary url={item.url}>
                    {item.btnText}
                  </Button>
                )
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}
export default Callout

Callout.defaultProps = {
  buttons: []
}
