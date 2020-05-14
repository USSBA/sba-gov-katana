import React from 'react'
import { isEmpty } from 'lodash'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

import pageStyles from './lender-lookup-page.scss'
import { Card } from 'molecules'
import { StyleWrapperDiv, TextInput, Link, MultiSelect, SimpleCarousel } from 'atoms'
import { PrimarySearchBar, Results, LenderDetail, OfficeMap } from 'organisms'
import { CallToAction } from 'molecules'
import SearchTemplate from '../../templates/search/search.jsx'
class LenderLookupPage extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      selectedItem: {},
      newCenter: {},
      shouldCenterMap: false,
      hoveredMarkerId: ''
    }
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
  will forgiveloads if all employees are kept on the payroll for eight weeks and the
  money is used for payroll, rent, mortgage interest, or utilities.`

  render() {
    const { selectedItem, newCenter, shouldCenterMap, hoveredMarkerId } = this.state
    const pageSize = 20
    const defaultSearchParams = {
      pageSize
    }

    return (
      <>
        <SimpleCarousel>
          <div style={{ minHeight: '200px', color: '#fff' }}>
            <h3>SBA is responding quickly to need and additional eligible lenders are added daily!</h3>
          </div>
          <div style={{ minHeight: '200px', color: '#fff' }}>
            <h3>
              {`If you are looking for other types of assistance, counseling, mentoring, or training,  please look `}
              <Link to="/local-assistance/find/" key="local-assistance">
                here
              </Link>
            </h3>
          </div>
          <div style={{ minHeight: '200px', color: '#fff' }}>
            <h3>
              {`For updates on the Payment Protection Program as they evolve, click `}
              <Link
                to="/funding-programs/loans/coronavirus-relief-options/paycheck-protection-program"
                key="ppp"
              >
                here
              </Link>
            </h3>
          </div>
        </SimpleCarousel>
        <div className={pageStyles.infoSection}>
          <div className={pageStyles.leftColumn}>
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
            customClass={pageStyles.rightColumn}
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
          extraClassName={pageStyles.lenderSearch}
          paginate={false}
          showStatus={false}
          onHandleEvent={this.centerMap.bind(this, false)}
        >
          <PrimarySearchBar
            id="lender-primary-search-bar"
            title="Find Eligible Paycheck Protection Program Lenders"
            className={pageStyles.searchBar}
          >
            <TextInput
              id="zip"
              queryParamName="address"
              className={pageStyles.field + ' ' + pageStyles.zip}
              label="Near"
              placeholder="Zip Code"
              validationFunction={input => {
                // only validate if there is an input value
                let result = true
                if (!isEmpty(input)) {
                  const fiveDigitRegex = /^\d{5}$/g
                  result = fiveDigitRegex.test(input)
                }
                return result
              }}
              errorText="Enter a 5-digit zip code."
            />
            {/* TC-3 Uncomment when adding back in tax question */}
            {/* <MultiSelect
              id="has-filed-2019-taxes"
              queryParamName="hasFiled2019Taxes"
              label="Have you filed your 2019 Taxes?"
              autoFocus={false}
              className={pageStyles.multiselect}
              multi={false}
              options={[
                {
                  label: 'Yes',
                  value: true
                },
                {
                  label: 'No',
                  value: false
                }
              ]}
              dataCy="has-filed-2019-taxes"
            /> */}
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

          <StyleWrapperDiv className={pageStyles.lenderResults} hideOnZeroState={true}>
            <Results
              shouldShowSearchInfoPanel={false}
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
              extraContainerStyles={pageStyles.centerContainer}
              extraResultContainerStyles={pageStyles.resultContainer}
              setWhiteBackground
            >
              <LenderDetail />
            </Results>
          </StyleWrapperDiv>
        </SearchTemplate>
        <div className={pageStyles.noticeWithLink}>
          {`If you notice incorrect bank information, please contact your `}
          <a href="https://www.sba.gov/tools/local-assistance/districtoffices">SBA District Office</a>
        </div>
        <div className={pageStyles.ctaContainer}>
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
