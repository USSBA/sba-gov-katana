import React from 'react'
import styles from './callout.scss'
import {
  LargeInverseSecondaryButton,
  LargeInversePrimaryButton,
  LargePrimaryButton
} from 'atoms'

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
        <h2 className={`callout-title ${styles.title}`}>{this.props.title}</h2>
        <p className={`callout-message ${styles.message}`}>
          {this.props.message}
        </p>
        <div className={`callout-buttons ${styles.buttonContainer}`}>
          <div className={`callout-button ${buttonStyles}`}>
            {this.props.buttons.map((item, index) => {
              if (item.btnType === 'LargePrimaryButton') {
                return (
                  <LargePrimaryButton
                    text={item.btnText}
                    key={index}
                    url={item.url}
                    eventConfig={item.eventConfig}
                  />
                )
              } else if (item.btnType === 'LargeInversePrimaryButton') {
                return (
                  <LargeInversePrimaryButton
                    text={item.btnText}
                    key={index}
                    url={item.url}
                    eventConfig={item.eventConfig}
                  />
                )
              } else if (item.btnType === 'LargeInverseSecondaryButton') {
                return (
                  <LargeInverseSecondaryButton
                    text={item.btnText}
                    key={index}
                    url={item.url}
                    eventConfig={item.eventConfig}
                  />
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
