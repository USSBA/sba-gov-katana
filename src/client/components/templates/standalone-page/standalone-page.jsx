import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import { isEmpty, compact } from 'lodash'
import classNames from 'classnames'
import { Loader } from 'atoms'
import { TitleSection } from 'molecules'
import basicPageStyles from '../basic-page/basic-page.scss'
import styles from './standalone-page.scss'
import previousNextSectionStyles from '../../molecules/previous-next/previous-next.scss'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper.js'
import * as paragraphMapper from '../paragraph-mapper.jsx'
import { getLanguageOverride } from '../../../services/utils.js'

const config = {
  backLinkText: 'Back to main page'
}
class StandalonePage extends Component {
  constructor() {
    super()
    this.state = {
      data: {},
      loadingState: 'unloaded'
    }
  }
  async componentDidMount() {
    const { id } = this.props
    if (id) {
      this.setState(
        {
          loadingState: 'isLoading'
        },
        async () => {
          const data = await fetchRestContent(id)
          this.setState({ data, loadingState: 'isLoaded' })
        }
      )
    }
  }

  makeSectionHeaders(paragraphData) {
    /* eslint-disable-next-line array-callback-return */
    const sectionHeaders = paragraphData.map(function(item, index, paragraphArray) {
      if (item && item.type && item.type === 'sectionHeader') {
        return {
          id: paragraphMapper.makeSectionHeaderId(index),
          text: item.text
        }
      }
    })

    return compact(sectionHeaders)
  }
  makeParagraphs(paragraphData) {
    const paragraphList = paragraphMapper.makeParagraphs(paragraphData)
    const wrapperClassMapping = {
      other: basicPageStyles.textSection,
      textSection: basicPageStyles.textSection,
      textReadMoreSection: 'none',
      sectionHeader: basicPageStyles.sectionHeader,
      subsectionHeader: basicPageStyles.subsectionHeader,
      image: basicPageStyles.image,
      lookup: basicPageStyles.lookup,
      callToAction: basicPageStyles.callToAction,
      cardCollection: basicPageStyles.cardCollection,
      styleGrayBackground: basicPageStyles.textSection
    }
    const wrapped = paragraphMapper.wrapParagraphs(paragraphList, wrapperClassMapping)
    return wrapped
  }

  setContent(data, langCode) {
    let content = data
    if (langCode === 'es' && data.spanishTranslation) {
      content = data.spanishTranslation
    }
    return content
  }

  render() {
    const { data, loadingState } = this.state
    let className, langCode, title, summary, paragraphs, sectionHeaders

    if (!isEmpty(data)) {
      langCode = getLanguageOverride()
      const content = this.setContent(data, langCode)
      title = content.title
      summary = content.summary
      paragraphs = this.makeParagraphs(content.paragraphs)
      sectionHeaders = this.makeSectionHeaders(content.paragraphs)
      className = classNames({
        'standalone-page-titlesection': true,
        [styles.content]: true
      })
    }

    return (
      <div>
        {loadingState === 'isLoading' && (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
        {loadingState === 'isLoaded' && (
          <div>
            {!isEmpty(data) ? (
              <div>
                <div data-testid="standalone-page-titlesection" className={className}>
                  <TitleSection
                    //gridClass={basicPageStyles.titleSection}
                    sectionHeaders={sectionHeaders}
                    title={title}
                    summary={summary}
                  />{' '}
                  {paragraphs}
                </div>
              </div>
            ) : (
              <div>No Data Found</div>
            )}
          </div>
        )}
      </div>
    )
  }
}

StandalonePage.propTypes = {
  params: PropTypes.object
}

export default StandalonePage
