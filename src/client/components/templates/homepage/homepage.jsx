import React, { PropTypes } from 'react'
import path from 'path'
import { kebabCase } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './homepage.scss'
import * as ContentActions from '../../../actions/content'
import * as LoadingActions from '../../../actions/loading'
import { FrontPageHero, MenuTileCollection } from 'organisms'
import { makeParagraphs, wrapParagraphs, makeSectionHeaderId } from '../paragraph-mapper'
import { findSection } from '../../../services/menu'

class Homepage extends React.Component {
  static propTypes = {
    // TODO: PropTypes.shape({})
    // data: PropTypes.object.isRequired,
    fetchContentIfNeeded: PropTypes.func.isRequired,
    removeLoader: PropTypes.func.isRequired
    // siteMap: PropTypes.array.isRequired
  }

  componentDidMount() {
    console.log('AAA, Homepage')
    const { fetchContentIfNeeded, removeLoader } = this.props
    fetchContentIfNeeded('siteMap', 'siteMap')
      .then(({ data }) => findSection(data, 'home-page'))
      .then(({ node }) => fetchContentIfNeeded('node', path.join('node', node)))
      .then(() => removeLoader())
  }

  render() {
    const { data, siteMap, removeLoader } = this.props

    if (!data) {
      return null
    }

    const { buttons, hero, paragraphs } = data

    // Get the menu tile collection content
    const [{ siteSection }] = paragraphs.filter(({ type }) => type === 'panelMenu')
    const sectionData = findSection(siteMap, kebabCase(siteSection))

    const paragraphElements = wrapParagraphs(makeParagraphs(paragraphs, null, null, {}, sectionData), {
      other: styles.textSection,
      textSection: styles.textSection,
      sectionHeader: styles.sectionHeader,
      image: styles.image,
      callToAction: styles.callToAction,
      cardCollection: styles.cardCollection
    })

    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <FrontPageHero hero={hero} button={buttons[0]} />
        </div>
        {paragraphElements.map(element => {
          const { props: { id } } = element
          const sectionClassName = id.startsWith('panelMenu')
            ? styles.sectionPanelMenu
            : styles.sectionWithPadding
          return (
            <div className={sectionClassName} key={id}>
              {element}
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { contentReducer: { node, siteMap } } = state
  return { data: node, siteMap }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(ContentActions, dispatch),
    ...bindActionCreators(LoadingActions, dispatch)
  }
}

export { Homepage }
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
