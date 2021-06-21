import React from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { find, isEmpty } from 'lodash'
import styles from './office-lookup-page.scss'
import geo2zip from 'geo2zip'

import { TaxonomyMultiSelect, StyleWrapperDiv, TextInput } from 'atoms'
import {
  PrimarySearchBar,
  Results,
  OfficeDetail,
  OfficeResult,
  OfficeMap,
  DefaultOfficeResult
} from 'organisms'
import SearchTemplate from '../../templates/search/search.jsx'

export const officeTypeTaxonomy = {
  name: 'officeType',
  terms: [
    'SCORE Business Mentoring',
    'Small Business Development Center',
    'U.S. Export Assistance Center',
    'Veteran’s Business Outreach Center',
    'Women’s Business Center',
    'Procurement Technical Assistance Center',
    'Certified Development Company'
  ]
}

class OfficeLookupPage extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      selectedItem: {},
      newCenter: {},
      shouldCenterMap: false,
      hoveredMarkerId: '',
      taxonomies: null,
      isValidZip: false,
      noResultsType: null,
      geoZip: ''
    }
    this.textInput = React.createRef()
  }

  updateNoResultsType(type) {
    this.setState({ noResultsType: type })
  }

  focusTextInput() {
    if (this.textInput.current) {
      this.textInput.current.focus()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.taxonomies
  }

  componentDidMount() {
    this.focusTextInput()
  }

  componentWillMount() {
    const necessaryTaxonomies = ['officeType', 'officeService']
    fetchSiteContent('taxonomys', {
      names: necessaryTaxonomies.join(',')
    }).then(results => {
      this.setState({ taxonomies: results })
    })
  }

  getTaxonomy(name) {
    if (!this.state.taxonomies) {
      return {
        name: '',
        terms: []
      }
    }
    const taxonomy = find(this.state.taxonomies, { name: name }) || { name: '', terms: [] }
    return taxonomy
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

  setGeoZip(mapCenter) {
    if (mapCenter) {
      this.geoToZip(mapCenter).then(zip => {
        this.setState({ geoZip: zip })
      })
    }
  }

  customDetailResultsView(resultsClassName, hideDetailState) {
    const { selectedItem } = this.state
    return (
      <div className={resultsClassName}>
        <OfficeDetail selectedItem={selectedItem} hideDetailState={hideDetailState} />
      </div>
    )
  }

  infoText =
    "Use this tool to find your nearest SBA District Office and other SBA-approved organizations.  SBA District Offices are responsible for providing small business owners with information about SBA's programs. SBA District Offices also oversee free and low-cost training and business counseling provided by independent organizations funded by the SBA. "

  async geoToZip(mapCenter) {
    const [lat, long] = mapCenter.split(/,/)
    const zip = await geo2zip({
      latitude: lat,
      longitude: long
    })
    return zip ? zip[0] : ''
  }

  render() {
    const { selectedItem, newCenter, shouldCenterMap, hoveredMarkerId } = this.state
    const pageSize = 5
    const defaultType = 'All Visible'
    const defaultSearchParams = {
      pageSize,
      type: defaultType
    }

    const officeServiceTaxonomy = this.getTaxonomy('officeService')

    // switch search tips based on whether there is a district office
    const searchTips = {
      invalidZipcode: ['No results found.  Please input a valid zip code.'],
      noOfficeResults: [
        'Your local SBA District office is displayed below, but no other results were found for your selections.',
        'Try to: Search a different zip code',
        'Contact your local SBA District Office'
      ]
    }

    const mapCenter = this.props?.location?.query?.mapCenter ? this.props.location.query.mapCenter : ''
    mapCenter &&
      this.geoToZip(mapCenter).then(zip => {
        let geoZip = zip
        if (!geoZip) {
          geoZip = this.props.location.query.address
        }
        if (geoZip !== this.state.geoZip) {
          this.setState({ geoZip: geoZip })
        }
      })
    return (
      <SearchTemplate
        searchType="offices"
        defaultSearchParams={defaultSearchParams}
        loadDefaultResults={false}
        scrollToTopAfterSearch={false}
        extraClassName={styles.officeSearch}
        paginate={false}
        showStatus={false}
        onHandleEvent={this.centerMap.bind(this, false)}
        allVisibleOffices={officeTypeTaxonomy.terms}
        updateNoResultsType={this.updateNoResultsType.bind(this)}
        geoZip={this.state.geoZip}
      >
        <PrimarySearchBar
          id="office-primary-search-bar"
          title="Find local assistance"
          className={styles.searchBar}
          isValid={this.state.isValidZip}
          validationFunction={false}
          infoText={this.infoText}
        >
          <TextInput
            id="zip"
            queryParamName="address"
            textRef={this.textInput}
            className={styles.field + ' ' + styles.zip}
            label="Business Zip Code"
            validationFunction={input => {
              // only validate if there is an input value

              let isValidZip = false
              if (!isEmpty(input)) {
                const fiveDigitRegex = /^\d{5}$/g
                isValidZip = fiveDigitRegex.test(input)
              }
              this.setState({ isValidZip })
              return isValidZip
            }}
            errorText="Enter a 5-digit zip code."
          />

          <TaxonomyMultiSelect
            taxonomy={officeTypeTaxonomy}
            label="Provided By"
            queryParamName="type"
            multi={false}
            className={styles.field + ' ' + styles.search}
          />
        </PrimarySearchBar>

        <StyleWrapperDiv className={styles.mapResults}>
          <OfficeMap
            id="office-map"
            zip={this.state.geoZip}
            mapType="office"
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
          <StyleWrapperDiv className={styles.officeResults} hideOnZeroState={true}>
            <Results
              id="office-results"
              paginate={true}
              scroll
              hasSearchInfoPanel
              searchTermName={'q'}
              onClick={item => {
                this.centerMap(true)
                this.setSelectedItem(item)
              }}
              selectedItem={selectedItem}
              hoveredMarkerId={hoveredMarkerId}
              onResultHover={id => {
                this.setHoveredMarkerId(id)
              }}
              searchTips={searchTips[`${this.state.noResultsType}`]}
              displaySearchTipsOnNoResults
              displayDefaultResultOnNoResults={false}
              customDetailResultsView={this.customDetailResultsView.bind(this)}
              extraContainerStyles={styles.centerContainer}
              extraResultContainerStyles={styles.resultContainer}
              setWhiteBackground={true}
              pageSize={5}
              totalOverride={50}
            >
              <OfficeResult />
            </Results>
          </StyleWrapperDiv>
        </StyleWrapperDiv>
      </SearchTemplate>
    )
  }
}

export default OfficeLookupPage
