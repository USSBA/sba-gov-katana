import React from 'react'

import s from './apply-button.scss'
import { SmallInverseSecondaryButton } from 'atoms'

class ApplyButton extends React.Component {
  render() {
    return (
      <div>
        <SmallInverseSecondaryButton
          onClick={() => {
            this.props.submit()
          }}
          extraClassName={s.applyButton}
          text={this.props.text}
        />
      </div>
    )
  }
}

ApplyButton.defaultProps = {
  text: 'Apply'
}

ApplyButton.propTypes = {
  text: React.PropTypes.string
}

export default ApplyButton
