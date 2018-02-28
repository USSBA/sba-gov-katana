import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContentActions from '../../../actions/content.js'
import { find, cloneDeep } from 'lodash'

import style from './office-lookup-page.scss'
import { TaxonomyMultiSelect, MultiSelect, TextInput } from 'atoms'
import { GlobalSearch, OfficesLayout, PrimarySearchBar, SecondarySearchBar } from 'organisms'
import SearchTemplate from '../../templates/search/search.jsx'

class OfficeLookupPage extends React.Component {
  componentWillMount() {
    const necessaryTaxonomies = ['officeType']
    this.props.actions.fetchContentIfNeeded('taxonomies', 'taxonomys', {
      names: necessaryTaxonomies.join(',')
    })
  }

  getTaxonomy(name) {
    console.log(name)
    if (!this.props.taxonomies) {
      return { name: '', terms: [] }
    }
    const taxonomy = find(this.props.taxonomies, { name: name })
    console.log('TAXONOMY', taxonomy)
    return taxonomy
  }
  render() {
    const officeTaxonomy = this.getTaxonomy('officeType') //{name:'officeType', terms: ['term1','term2','term3']}//this.getTaxonomy('officeType')
    console.log('OFFICELOOKP', officeTaxonomy)
    return (
      <SearchTemplate>
        <PrimarySearchBar title="Find local assistance" onSearch={() => {}} onFieldChange={() => {}}>
          <TextInput
            id="search"
            className={style.search}
            label="Find"
            placeholder="Counseling, training, mentoring..."
            validationState={''}
            showSearchIcon={true}
          />
          <TextInput
            id="zip"
            className={style.zip}
            label="Near"
            placeholder="Zip Code"
            validationState={''}
          />
        </PrimarySearchBar>
        <SecondarySearchBar>
          <TaxonomyMultiSelect taxonomy={officeTaxonomy} label="Organization:" multi={false} />
        </SecondarySearchBar>
      </SearchTemplate>
    )
  }
}

function mapReduxStateToProps(reduxState, props) {
  return {
    taxonomies: reduxState.contentReducer.taxonomies,
    items: reduxState.contentReducer[props.type],
    location: props.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(OfficeLookupPage)
