import React from 'react'
import { isEmpty, debounce } from 'lodash'

import { fetchSiteContent } from '../../../fetch-content-helper'

import styles from './lender-lookup-page.scss'
import { Card } from 'molecules'
import { StyleWrapperDiv, TextInput, Link, MultiSelect, SimpleCarousel, DatalistDropdown } from 'atoms'
import { PrimarySearchBar, Results, LenderDetail, OfficeMap } from 'organisms'
import { CallToAction } from 'molecules'
import SearchTemplate from '../../templates/search/search.jsx'
class LenderLookupPage extends React.PureComponent {
  constructor() {
    super()
    this.debouncedFetchContent = debounce(fetchSiteContent, 250)
    this.state = {
      selectedItem: {},
      newCenter: {},
      shouldCenterMap: false,
      hoveredMarkerId: '',
      isLenderNameVisible: false,
      lenderSuggestions: []
    }
  }

  async getLenderSuggestions(value) {
    const suggestions = await this.debouncedFetchContent('suggestions', { lenderName: value })
    this.setState({ lenderSuggestions: suggestions })
  }

  hideLenderName() {
    this.setState({ isLenderNameVisible: false })
  }

  showLenderName() {
    this.setState({ isLenderNameVisible: true })
  }

  setSelectedItem(selectedItem) {
    const newState = {
      selectedItem,
      newCenter: {}
    }

    if (!isEmpty(selectedItem) && !isEmpty(selectedItem.item.geolocation)) {
      const [lat, lng] = selectedItem.item.geolocation[0].split(',')
      newState.newCenter = {
        lat: Number(lat),
        lng: Number(lng)
      }
    }

    this.setState(newState)
  }

  centerMap(shouldCenterMap) {
    this.setState({ shouldCenterMap })
  }

  setHoveredMarkerId(hoveredMarkerId) {
    this.setState({ hoveredMarkerId })
  }

  buttonAction = {
    link: {
      title: 'Additional Relief Options',
      url: '/funding-programs/loans/coronavirus-relief-options'
    },
    type: 'link'
  }

  image = {
    url: '/assets/images/local-assistance/AdditionalFundingCTAImage.jpg',
    alt: 'african american woman business owner'
  }

  howItWorksText = `The Paycheck Protection Program is a loan designed to provide a 
  direct incentive for small businesses to keep their workers on the payroll. SBA 
  will forgive loans if all employees are kept on the payroll for eight weeks and the
  money is used for payroll, rent, mortgage interest, or utilities.`

  render() {
    const { selectedItem, newCenter, shouldCenterMap, hoveredMarkerId } = this.state
    const pageSize = 20
    const defaultSearchParams = {
      pageSize
    }

    return (
      <>
        <div className={styles.infoSection}>
          <div className={styles.leftColumn}>
            <h2>Find Eligible Paycheck Protection Program Lenders</h2>
            <p>
              {`If you wish to begin preparing your application, you can download a copy of `}
              <Link
                to="https://www.sba.gov/document/sba-form--paycheck-protection-program-borrower-application-form"
                key="ppp-application"
              >
                PPP borrower application form
              </Link>
              {` to see the information that will be requested from you when you apply with a lender`}
            </p>
          </div>
          <Card
            customClass={styles.rightColumn}
            item={{
              link: {
                url:
                  'https://www.sba.gov/funding-programs/loans/coronavirus-relief-options/paycheck-protection-program',
                title: 'Read more about the Payment Protection Program'
              },
              subtitleText: this.howItWorksText,
              titleText: 'How It Works'
            }}
            index={0}
            numCards={1}
          />
        </div>
        <SearchTemplate
          searchType="lenders"
          defaultSearchParams={defaultSearchParams}
          loadDefaultResults={false}
          scrollToTopAfterSearch={false}
          extraClassName={styles.lenderSearch}
          paginate={false}
          showStatus={false}
          onHandleEvent={this.centerMap.bind(this, false)}
        >
          <PrimarySearchBar
            id="lender-primary-search-bar"
            title="Find Eligible Paycheck Protection Program Lenders"
            className={styles.searchBar}
          >
            <TextInput
              id="zip"
              queryParamName="address"
              className={styles.field + ' ' + styles.zip}
              label="Near"
              placeholder="Zip Code"
              validationFunction={input => {
                // only validate if there is an input value
                let isValid = true
                if (!isEmpty(input)) {
                  const fiveDigitRegex = /^\d{5}$/g
                  isValid = fiveDigitRegex.test(input)
                }
                isValid && input ? this.showLenderName() : this.hideLenderName()
                return isValid
              }}
              errorText="Enter a 5-digit zip code."
            />
            <TextInput
              isVisible={this.state.isLenderNameVisible}
              id="lenderName"
              queryParamName="lenderName"
              className={styles.field + ' ' + styles.lenderName}
              label="Lender Name"
              placeholder="Search for my bank"
              optional
              listName="lenders"
              onChangeCallback={value => {
                this.getLenderSuggestions(value)
              }}
            />
            <DatalistDropdown id="lenders" options={this.state.lenderSuggestions || []} />
          </PrimarySearchBar>
          <OfficeMap
            id="office-map"
            onMarkerClick={item => {
              this.centerMap(true)
              this.setSelectedItem(item)
            }}
            selectedItem={selectedItem}
            newCenter={newCenter}
            onDragEnd={() => {
              this.centerMap(true)
            }}
            shouldCenterMap={shouldCenterMap}
            onMarkerHover={id => {
              this.setHoveredMarkerId(id)
            }}
            hoveredMarkerId={hoveredMarkerId}
          />

          <StyleWrapperDiv className={styles.lenderResults} hideOnZeroState={true}>
            <Results
              id="lender-results"
              paginate={true}
              scroll
              hasSearchInfoPanel
              onClick={item => {
                this.centerMap(true)
                this.setSelectedItem(item)
              }}
              selectedItem={selectedItem}
              hoveredMarkerId={hoveredMarkerId}
              onResultHover={id => {
                this.setHoveredMarkerId(id)
              }}
              extraContainerStyles={styles.centerContainer}
              extraResultContainerStyles={styles.resultContainer}
              setWhiteBackground
              searchTermName={'lenderName'}
              displaySearchTipsOnNoResults
              searchTips={['Try entering a different lender name']}
            >
              <LenderDetail />
            </Results>
          </StyleWrapperDiv>
        </SearchTemplate>
        <div className={styles.noticeWithLink}>
          {`If you notice incorrect bank information, please contact your `}
          <a href="https://www.sba.gov/tools/local-assistance/districtoffices">SBA District Office</a>
        </div>
        <div className={styles.ctaContainer}>
          <CallToAction
            size="Large"
            headline="Looking for another funding option?"
            blurb="We're here to help you overcome the challenges created by this health crisis. We offer multiple funding options for those seeking economic relief."
            buttonAction={this.buttonAction}
            image={this.image}
          />
        </div>
      </>
    )
  }
}

export default LenderLookupPage
