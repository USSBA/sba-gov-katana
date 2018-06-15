import React from 'react'

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
    const { isExpanded } = this.state

    return (
      <div className={styles.googleTranslate}>
        <div className={isExpanded ? styles.show : styles.hide} id="google_translate_element" />
        <UtilityLink
          visible={!this.state.isExpanded}
          onClick={this.handleGoogleTranslateClick.bind(this)}
          text="Translate"
        />
      </div>
    )
  }
}

export default GoogleTranslate
