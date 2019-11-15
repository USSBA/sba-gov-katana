import React, { Component } from 'react'
import Waypoint from 'react-waypoint'
import { isEmpty, compact } from 'lodash'
import { listenForOverlap } from 'element-overlap'
import classNames from 'classnames'
import { Loader } from 'atoms'
import { TitleSection } from 'molecules'
import { SectionNav } from 'organisms'
import basicPageStyles from '../basic-page/basic-page.scss'
import styles from './district-office-subpage.scss'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper.js'
import * as paragraphMapper from '../paragraph-mapper.jsx'
import { getLanguageOverride } from '../../../services/utils.js'

class DistrictOfficeSubPage extends Component {

	constructor() {
	    super()
	    this.state = {
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
	    const { subPageId } = this.props.params
	    if (subPageId) {
	      this.setState(
	        {
	          loadingState: 'isLoading'
	        },
	        async () => {
	          const data = await fetchRestContent(subPageId)
	          this.setState({ data, loadingState: 'isLoaded' })
	        }
	      )
	    }

	    /*listenForOverlap('#article-navigation-desktop', '#sba-footer', this.handleOverlap, {
	      listenOn: 'scroll'
	    })*/
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

	sectionNavigation(langCode) {
		return this.props.lineage ? (
		  <SectionNav
		    onTopEnter={this.handleSectionNavigationEnter}
		    position={this.state.currentPosition}
		    displayMobileNav={this.state.displayMobileNav}
		    lineage={null}
		    langCode={langCode}
		  />
		) : (
		  <div />
		)
	}

	render() {
		const { data, loadingState } = this.state
		let className, langCode, paragraphs, sectionHeaders

		if (!isEmpty(data)) {
			langCode = getLanguageOverride()
			paragraphs = this.makeParagraphs(data.paragraphs)
			sectionHeaders = this.makeSectionHeaders(data.paragraphs)

			className = classNames({
			    "district-office-subpage-basicpage-titlesection": true,
			    [styles.content]: true
			})
		}

		return (
			<div>
				{loadingState === 'isLoading' && <div className={styles.loaderContainer}><Loader /></div>}
				{loadingState === 'isLoaded' && (
		          <div>
		            {!isEmpty(data) ? (
		            	<div>
		            		<Waypoint
					          topOffset="30px"
					          onEnter={this.handleTopWaypointEnter}
					          onLeave={this.handleTopWaypointLeave}
					        />
					        <div className="district-office-subpage-sectionnavigation">{this.sectionNavigation(langCode)}</div>
		              		<div className={className}>
								<TitleSection
									key={1}
									gridClass={basicPageStyles.titleSection}
									sectionHeaders={sectionHeaders}
									title={data.title}
									summary={data.summary}
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

export default DistrictOfficeSubPage
