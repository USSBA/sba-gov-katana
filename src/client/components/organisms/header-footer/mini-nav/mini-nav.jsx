import React from 'react'
import classNames from 'classnames'
import cookie from 'react-cookie'
import { isFunction, kebabCase, size } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as ModalActions from '../../../../actions/show-modal'
import clientConfig from '../../../../services/client-config'
import config from '../../../../services/client-config'
import styles from './mini-nav.scss'
import { getLanguageOverride } from '../../../../services/utils'
import { TRANSLATIONS } from '../../../../translations'
import { UtilityLink } from 'atoms'
import { SearchBar, GoogleTranslate } from 'molecules'
import { runMiscAction } from '../../../../fetch-content-helper'

class MiniNav extends React.Component {
  timerId = null

  constructor(props) {
    super()

    this.state = {
      translateIsExpanded: false,
      isSearchExpanded: false
    }
  }

  componentDidMount() {
    const {
      modalActions: { showSbaNewsletter }
    } = this.props
  }

  onSearchBarExpand(isSearchExpanded) {
    this.setState({
      isSearchExpanded
    })
  }

  render() {
    const { isSearchExpanded } = this.state

    // e.g. get just "en" if given "en-US"
    const langCode = getLanguageOverride(true)
    const { translate } = TRANSLATIONS

    const link = key => {
      if (!key) {
        return null
      }

      const { text, url } = TRANSLATIONS[key][langCode]

      return (
        <UtilityLink id={kebabCase(`desktop-mini-nav ${text}`)} key={text} text={text} gray url={url} />
      )
    }

    const miniNavClassNames = classNames({
      [styles.miniNav]: true,
      [styles.searchBar]: isSearchExpanded
    })

    return (
      <div className={miniNavClassNames}>
        <ul id="deskop-mini-nav" aria-label="mini-navigation">
          <GoogleTranslate text={translate[langCode].text} />
          {['sbaEnEspanol', 'forPartners', 'newsroom', 'contactUs'].map(link)}
          <SearchBar onExpand={isExpanded => this.onSearchBarExpand(isExpanded)} />
        </ul>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(ModalActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(MiniNav)

export { MiniNav }
