import React from 'react'
import _ from 'lodash'

import { LargeInversePrimaryButton, MultiSelect, SearchIcon, TextInput } from 'atoms'
import styles from './search-box.scss'
import { logPageEvent } from '../../../services/analytics.js'
import { navigateNow } from '../../../services/navigation.js'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}

const createCamelCase = str => {
  const sliceIndex = 1
  const _str = str[0].toLowerCase() + str.slice(sliceIndex)
  return _str.replace(' ', '')
}

class SearchBox extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
      selectedDocumentType: 'All',
      selectedProgram: 'All',
      selectedDocumentActivity: 'All'
    }
  }

  renderMultiSelect(taxonomyFilter) {
    const taxonomy = this.props[taxonomyFilter].slice()

    const name = taxonomyFilter
    const id = `${createSlug(name)}-select`
    const capitalizedStateName = taxonomyFilter[0].toUpperCase() + taxonomyFilter.slice(1)

    // add an "All" filter option to list
    taxonomy.unshift('All')

    const options = taxonomy.map(entry => {
      // customize the "All" entry label
      const result = {
        label: entry === 'All' ? this.props[`multiSelect${capitalizedStateName}DefaultLabel`] : entry,
        value: entry
      }

      return result
    })

    const multiSelectProps = {
      id: id,
      onChange: event => {
        this.handleChange(event)
      },
      name: id,
      value: this.state[`selected${capitalizedStateName}`],
      options
    }

    const returnNull = () => {
      return null
    }

    return (
      <div key={id} className={styles.multiSelect}>
        <MultiSelect
          {...multiSelectProps}
          onBlur={returnNull}
          onFocus={returnNull}
          validationState=""
          errorText=""
          autoFocus={false}
          multi={false}
        />
      </div>
    )
  }

  handleChange(event) {
    const { documentType, documentActivity, program } = this.props
    const { value } = event

    if (documentType.includes(value)) {
      this.setState({
        selectedDocumentType: value
      })
    } else if (documentActivity.includes(value)) {
      this.setState({
        selectedDocumentActivity: value
      })
    } else if (program.includes(value)) {
      this.setState({
        selectedProgram: value
      })
    }
  }

  handleKeyUp(event) {
    const returnKeyCode = 13
    if (event.keyCode === returnKeyCode) {
      logPageEvent({
        category: _.kebabCase('Documentation-Lookup-Ancillary'),
        action: `Search Enter-Button:
          Type: ${this.state.selectedDocumentType};
          Program: ${this.state.selectedProgram};
          Activity: ${this.state.selectedDocumentActivity};
          Term: ${this.state.searchTerm}`
      })
      this.submit()
    }
  }

  handleOnClick() {
    logPageEvent({
      category: _.kebabCase('Documentation-Lookup-Ancillary'),
      action: `Search CTA-Click:
        Type: ${this.state.selectedDocumentType};
        Program: ${this.state.selectedProgram};
        Activity: ${this.state.selectedDocumentActivity};
        Term: ${this.state.searchTerm}`
    })
    this.submit()
  }

  updateSearchTerm(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  submit() {
    // ? html encode each term on this page and then decode on target page ?

    let queryString = `search=${this.state.searchTerm}`
    queryString += `&documentType=${this.state.selectedDocumentType}`
    queryString += `&program=${this.state.selectedProgram}`
    queryString += `&documentActivity=${this.state.selectedDocumentActivity}`

    navigateNow(`/document/?${queryString}`)
  }

  render() {
    const filterNames = ['documentType', 'program', 'documentActivity']
    return (
      <div className={styles.container}>
        <div className={styles.blueParagraph}>
          <h2>{this.props.sectionHeaderText}</h2>
          <p>{this.props.subtitleText}</p>
          <div className={styles.searchBox}>
            <TextInput
              placeholder="Search by title or number"
              id="document-lookup"
              errorText={'Please enter the correct thing.'}
              validationState={''}
              onKeyUp={e => {
                return this.handleKeyUp(e)
              }}
              onChange={e => {
                return this.updateSearchTerm(e)
              }}
            />
            <div className={styles.searchIcon}>
              <SearchIcon aria-hidden="true" />
            </div>
          </div>
          {filterNames.map(filterName => {
            return this.renderMultiSelect(filterName)
          })}
          <div className={styles.clear} />
          <LargeInversePrimaryButton
            onClick={this.handleOnClick.bind(this)}
            className={styles.submitButton}
            text="Search"
          />
        </div>
      </div>
    )
  }
}

SearchBox.defaultProps = {
  sectionHeaderText: 'Search documents, forms, and SOPs',
  subtitleText: 'Search by title or document number',
  multiSelectDocumentTypeDefaultLabel: 'All document types',
  documentType: [
    'SBA form',
    'SOP',
    'Policy Guidance',
    'TechNote',
    'Procedural notice',
    'Information notice',
    'Policy notice',
    'Support'
  ],
  multiSelectProgramDefaultLabel: 'All programs',
  program: [
    'SBIC',
    'Surety Bonds',
    '7(a)',
    'CDC/504',
    'Microlending',
    'HUBZone',
    'Disaster',
    '8(a)',
    'SBA operations',
    'Contracting',
    'Community Advantage'
  ],
  multiSelectDocumentActivityDefaultLabel: 'All document activity',
  documentActivity: [
    'Authorization',
    'Servicing',
    'Closing',
    'Liquidation',
    'Litigation',
    'Guaranty purchase',
    'Licensing and organizational',
    'Credit and risk',
    'Investment and transactions',
    'Leverage commitments and draws',
    'Periodic reporting',
    'General',
    'Processing',
    'Secondary market'
  ]
}

export default SearchBox
