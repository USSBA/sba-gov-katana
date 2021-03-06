import React from 'react'
import PropTypes from 'prop-types'

import styles from './google-translate.scss'
import { UtilityLink } from 'atoms'

class GoogleTranslate extends React.Component {
  componentDidMount() {
    // Load the Google translate script after the node-to-attach-to has loaded.
    const script = document.createElement('script')
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    document.body.appendChild(script)
  }

  constructor() {
    super()

    this.state = {
      isExpanded: false
    }
  }

  handleGoogleTranslateClick(event) {
    event.preventDefault()
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const { text } = this.props
    const { isExpanded } = this.state

    return (
      <div className={styles.googleTranslate}>
        <div className={isExpanded ? styles.show : styles.hide} id="google_translate_element" />
        <UtilityLink
          onClick={this.handleGoogleTranslateClick.bind(this)}
          text={text}
          gray
          visible={!isExpanded}
        />
      </div>
    )
  }
}

GoogleTranslate.propTypes = {
  text: PropTypes.string
}

export default GoogleTranslate
