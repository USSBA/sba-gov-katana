import React from 'react'

import s from './apply-button.scss'
import { SmallInverseSecondaryButton } from 'atoms'

class ApplyButton extends React.Component {
  render() {
    return (
      <div id={this.props.id}>
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
  text: 'Apply',
  id: null
}

ApplyButton.propTypes = {
  text: React.PropTypes.string,
  id: React.PropTypes.string
}

export default ApplyButton
