import React from 'react'
import { camelCase, isEmpty, startCase } from 'lodash'

import styles from './document-article-lookup.scss'
import { Button, Loader, MultiSelect, SearchIcon, TextInput } from 'atoms'
import { Paginator } from 'molecules'
import { DetailCardCollection } from 'organisms'
import { logPageEvent } from '../../../services/analytics.js'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}

// const createCamelCase = (str) => {
//
//   const sliceIndex = 1;
//   const _str = str[0].toLowerCase() + str.slice(sliceIndex);
//   return _str.replace(" ", "");
//
// };

export class DocumentArticleLookup extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      office: 'all'
    }
  }
  renderMultiSelects() {
    const _multiselects = this.props.taxonomies.map(taxonomy => {
      const { name } = taxonomy
      const id = `${createSlug(name)}-select`
      const stateName = camelCase(name)
      const options = taxonomy.terms.map(entry => {
        return { label: entry, value: entry }
      })

      const _ms = {
        id: id,
        onChange: event => {
          this.handleChange(event, stateName)
        },
        name: id,
        label: startCase(name),
        value: this.props.queryState[stateName],
        options: options
      }

      return _ms
    })

    return _multiselects.map((multiSelectProps, index) => {
      const returnNull = () => {
        return null
      }

      this.sortList(multiSelectProps.options)

      return (
        <div className={styles.multiSelect} key={index}>
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
    })
  }

  renderSbaOfficeMultiSelect() {
    if (this.props.sbaOffices !== null) {
      return (
        <div className={styles.multiSelect}>
          <MultiSelect
            id="office"
            label="Office"
            options={this.props.sbaOffices}
            onChange={event => {
              this.handleChange(event, 'office')
            }}
            data-testid="office-search-dropdown"
            value={this.props.queryState.office}
          />
        </div>
      )
    }
  }

  // Sorts the list by placing 'All' at the top (if applicable) with the remaining list items sorted alphabetically
  sortList(listOptions) {
    listOptions.sort((a, b) => {
      let comparison = 0

      if ((a.value < b.value && b.value !== 'All') || a.value === 'All') {
        comparison = -1
      } else if (a.value > b.value || b.value === 'All') {
        comparison = 1
      }

      return comparison
    })
  }

  handleChange(event, selectStateKey) {
    this.props.onQueryChange(selectStateKey, event.value)
  }

  handleKeyUp(event) {
    const returnKeyCode = 13
    if (event.keyCode === returnKeyCode) {
      this.props.onSubmit()
    }
  }

  updateSearchTerm(event) {
    this.props.onQueryChange('searchTerm', event.target.value)
  }

  renderCards() {
    let result = (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    )
    const { items, pageNumber, isFetching } = this.props
    if (!isEmpty(items)) {
      result = (
        <DetailCardCollection
          type={this.props.type}
          cards={items}
          fieldsToShowInDetails={this.props.fieldsToShowInDetails}
        />
      )
    } else if (typeof items !== 'undefined' && !isFetching) {
      result = (
        <div className={styles.emptyDocuments}>
          <p className={styles.emptyDocumentsMessage}>
            Sorry, we couldn't find any {this.props.type} matching that query.
          </p>
          <p>
            <a onClick={this.props.onReset}>Clear all search filters</a>
          </p>
        </div>
      )
    }

    return <div className={styles.documentCardCollection}>{result}</div>
  }

  renderPaginator() {
    const { items, itemCount, pageNumber, pageSize } = this.props
    let result = <div />
    if (!isEmpty(items)) {
      result = (
        <div className={styles.paginator}>
          <Paginator
            pageNumber={pageNumber}
            pageSize={pageSize}
            total={itemCount}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
      )
    }
    return result
  }

  handleBack() {
    const { pageNumber, onPageChange } = this.props
    const newPageNumber = Math.max(1, pageNumber - 1)
    onPageChange(newPageNumber)
    logPageEvent({ category: 'Show-More-Results', action: 'Previous' })
  }

  handleForward() {
    const { itemCount, pageNumber, onPageChange } = this.props
    const newPageNumber = Math.min(Math.max(1, Math.ceil(itemCount / this.props.pageSize)), pageNumber + 1)
    onPageChange(newPageNumber)
    logPageEvent({ category: 'Show-More-Results', action: 'Next' })
  }

  renderSearchInput() {
    const textInputProps = {
      placeholder: 'Search by title or number',
      id: 'document-lookup-text-input',
      errorText: 'Please enter the correct thing.',
      label: 'Search',
      validationState: '',
      onKeyUp: e => {
        return this.handleKeyUp(e)
      },
      onChange: e => {
        return this.updateSearchTerm(e)
      },
      value: this.props.queryState.searchTerm
    }
    return (
      <div className={styles.searchBox}>
        <TextInput {...textInputProps} />
        <div className={styles.searchIcon}>
          <SearchIcon aria-hidden="true" />
        </div>
      </div>
    )
  }

  numberOfMultiSelects() {
    let count = this.props.taxonomies.length
    this.props.sbaOffices !== null && count++
    return count
  }

  renderBanner() {
    if (this.numberOfMultiSelects() >= 5) {
      return (
        <div className={styles.twoLineBanner}>
          <h2 className={styles.header}>{this.props.title}</h2>
          {this.renderBannerContent()}
        </div>
      )
    } else {
      return (
        <div className={styles.oneLineBanner}>
          <h2 className={styles.header}>{this.props.title}</h2>
          {this.renderBannerContent()}
        </div>
      )
    }
  }

  renderBannerContent() {
    if (this.props.taxonomies.length > 0) {
      return (
        <div>
          {this.renderSearchInput()}
          {this.renderMultiSelects()}
          {this.renderSbaOfficeMultiSelect()}
          {this.renderButton()}
        </div>
      )
    }
  }

  renderButton() {
    if (this.numberOfMultiSelects() >= 5) {
      return (
        <div className={styles.leftApplyButton}>
          <Button primary alternate onClick={this.props.onSubmit}>
            Apply
          </Button>
        </div>
      )
    } else {
      return (
        <div className={styles.rightApplyButton}>
          <Button primary alternate onClick={this.props.onSubmit}>
            Apply
          </Button>
        </div>
      )
    }
  }

  dontrender() {
    return (
      <div>
        <div className={styles.twoLineBanner}>
          <h2 className={styles.header}>{this.props.title}</h2>
          {this.props.taxonomies.length > 0 && (
            <div>
              {this.renderSearchInput()}
              {this.renderMultiSelects()}
              {this.renderSbaOfficeMultiSelect()}
              <div className={styles.applyButton}>
                <Button primary alternate onClick={this.props.onSubmit}>
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.result}>
          {this.renderPaginator()}
          {this.renderCards()}
          {this.renderPaginator()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderBanner()}
        <div className={styles.result}>
          {this.renderPaginator()}
          {this.renderCards()}
          {this.renderPaginator()}
        </div>
      </div>
    )
  }
}

export default DocumentArticleLookup
