import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import { isEmpty, compact } from 'lodash'
import { listenForOverlap } from 'element-overlap'
import classNames from 'classnames'
import { Loader } from 'atoms'
import { TitleSection } from 'molecules'
import basicPageStyles from '../basic-page/basic-page.scss'
import styles from './district-office-subpage.scss'
import sectionNavStyles from '../../organisms/section-nav/section-nav.scss'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper.js'
import * as paragraphMapper from '../paragraph-mapper.jsx'
import { getLanguageOverride } from '../../../services/utils.js'

class DistrictOfficeSubPage extends Component {
  constructor() {
    super()
    this.state = {
      sectionTitle: '',
      data: {},
      loadingState: 'unloaded',
      slideLeftNavIn: false,
      slideContentIn: false,
      displayMobileNav: false,
      currentPosition: 'top'
    }

    this.handleSectionNavigationEnter = this.handleSectionNavigationEnter.bind(this)
    this.handleTopWaypointEnter = this.handleTopWaypointEnter.bind(this)
    this.handleTopWaypointLeave = this.handleTopWaypointLeave.bind(this)
    this.handleBackLinkClicked = this.handleBackLinkClicked.bind(this)
    this.handleOverlap = this.handleOverlap.bind(this)
  }
  async componentDidMount() {
    const { pageConnectorId } = this.props.params

    if (pageConnectorId) {
      this.setState(
        {
          loadingState: 'isLoading'
        },
        async () => {
          const { title: sectionTitle, subpages } = await fetchRestContent(pageConnectorId)
          const data = []
          for (let i = 0; i < subpages.length; i++) {
            data.push(await fetchRestContent(subpages[i].id))
          }
          this.setState({ sectionTitle, data, loadingState: 'isLoaded' })
        }
      )
    }

    listenForOverlap('#article-navigation-desktop', '#sba-footer', this.handleOverlap, {
      listenOn: 'scroll'
    })
  }
  handleBackLinkClicked(e) {
    e.preventDefault()
    this.setState({
      slideLeftNavIn: false,
      slideContentIn: false,
      displayMobileNav: true
    })
  }
  handleTopWaypointEnter() {
    this.setState({ currentPosition: 'top' })
  }
  handleTopWaypointLeave() {
    this.setState({ currentPosition: 'middle' })
  }
  handleBottomWaypointLeave() {
    this.setState({ currentPosition: 'middle' })
  }
  handleSectionNavigationEnter() {
    if (this.state.currentPosition === 'bottom') {
      this.setState({ currentPosition: 'middle' })
    }
  }
  handleOverlap() {
    this.setState({ currentPosition: 'bottom' })
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
  render() {
    const { officeId, pageConnectorId, subPageId } = this.props.params
    const { sectionTitle, data, loadingState, currentPosition, displayMobileNav } = this.state
    let currentPage, className, langCode, paragraphs, sectionHeaders

    if (!isEmpty(data)) {
      currentPage = data.find(item => String(item.id) === subPageId) || data[0]
      langCode = getLanguageOverride()
      paragraphs = this.makeParagraphs(currentPage.paragraphs)
      sectionHeaders = this.makeSectionHeaders(currentPage.paragraphs)
      className = classNames({
        'district-office-subpage-titlesection': true,
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
                <Waypoint
                  topOffset="30px"
                  onEnter={this.handleTopWaypointEnter}
                  onLeave={this.handleTopWaypointLeave}
                />
                <div
                  data-testid="district-office-subpage-sectionnavigation"
                  className="district-office-subpage-sectionnavigation"
                >
                  <SectionNav
                    onTopEnter={this.handleSectionNavigationEnter}
                    position={currentPosition}
                    displayMobileNav={displayMobileNav}
                    data={data}
                    sectionTitle={sectionTitle}
                    langCode={langCode}
                    officeId={officeId}
                    pageConnectorId={pageConnectorId}
                    subPageId={!isEmpty(subPageId) ? subPageId : data[0].id}
                  />
                </div>
                <div data-testid="district-office-subpage-titlesection" className={className}>
                  <TitleSection
                    key={1}
                    gridClass={basicPageStyles.titleSection}
                    sectionHeaders={sectionHeaders}
                    title={currentPage.title}
                    summary={currentPage.summary}
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

DistrictOfficeSubPage.propTypes = {
  params: PropTypes.object,
  lineage: PropTypes.object
}

const SectionNav = ({ officeId, pageConnectorId, subPageId, sectionTitle, data, position, onTopEnter }) => {
  const stickyFunctionTop = () => {
    return position === 'middle' ? sectionNavStyles.stickyTop : null
  }
  const stickyFunctionBottom = () => {
    return position === 'bottom' ? sectionNavStyles.stickyBottom : null
  }
  const makeNavLinks = (_data, id) => {
    const result = _data.map(function(item, index) {
      const currentLinkClass = String(id) === String(item.id) ? sectionNavStyles.currentNavLink : ''
      return (
        <li className={currentLinkClass} key={index}>
          <a
            className="article-navigation-article-link-desktop"
            id={'desktop-article-link-' + index}
            href={`/offices/district/${officeId}/${pageConnectorId}/${item.id}`}
          >
            {item.title}
          </a>
        </li>
      )
    })
    return result
  }
  const navLinks = makeNavLinks(data, subPageId)
  return (
    <div
      id="article-navigation-desktop"
      className={sectionNavStyles.sectionNav + ' ' + stickyFunctionTop() + ' ' + stickyFunctionBottom()}
    >
      <Waypoint topOffset="30px" onEnter={onTopEnter} />
      <a
        id="article-navigation-back-button-desktop"
        className={sectionNavStyles.backLink}
        href={`/offices/district/${officeId}/`}
      >
        Back to District Office Main Page
      </a>
      <span id="article-navigation-title-desktop">
        <h3>{sectionTitle}</h3>
      </span>
      <ul>{navLinks}</ul>
    </div>
  )
}

export default DistrictOfficeSubPage
