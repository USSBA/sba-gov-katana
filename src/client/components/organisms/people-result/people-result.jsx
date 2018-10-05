import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import styles from './people-result.scss'
import { Button, Loader, MultiSelect, SearchIcon, TextInput } from 'atoms'
import { Paginator } from 'molecules'
import { DetailCardCollection } from 'organisms'

export class PeopleResult extends React.Component {
  super() {
    this.renderPaginator = this.renderPaginator.bind(this)
  }

  renderDefaultView(children) {
    return <div>{children}</div>
  }

  renderPaginator() {
    const { total, pageSize, pageNumber, onBack, onForward } = this.props

    return this.shouldRenderPaginator() ? (
      <div className={styles.paginator}>
        <Paginator
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={total}
          onBack={onBack}
          onForward={onForward}
        />
      </div>
    ) : null
  }
  shouldRenderPaginator() {
    const { isLoading, hidePaginatorOnNoResults, items, paginate } = this.props
    //don't render paginator while the page is loading, if pagination is disabled, or if the paginator is
    //disabled and there are no results
    return !isLoading && paginate && !(hidePaginatorOnNoResults && !items.length)
  }

  renderCards() {
    let result = (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    )

    const { items, offices } = this.props

    if (!isEmpty(offices) && !isEmpty(items)) {
      const fieldsToShowInDetails = ['Title', 'Office', 'Phone', 'Email']

      const peopleWithOfficeMatch = items.map(person => {
        let idMatch = offices.find(office => office.id === person.office)
        return idMatch ? { ...person, office: idMatch.title } : person
      })

      result = (
        <DetailCardCollection
          cards={peopleWithOfficeMatch}
          type={peopleWithOfficeMatch[0].type}
          fieldsToShowInDetails={fieldsToShowInDetails}
        />
      )
    } else if ((offices === null && isEmpty(offices)) || (items === null && isEmpty(items))) {
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

  render() {
    return (
      <div className={styles.result}>
        {this.renderPaginator()}
        {this.renderCards()}
        {this.renderPaginator()}
      </div>
    )
  }
}

PeopleResult.defaultProps = {
  items: [],
  id: null,
  resultId: 'result',
  paginate: false,
  scroll: false,
  hasSearchInfoPanel: false,
  displaySearchTipsOnNoResults: false,
  hidePaginatorOnNoResults: true,
  searchTermName: '',
  submittedFieldValues: {},
  searchTips: [],
  onClick: () => {},
  onResultHover: () => {}
}

PeopleResult.propTypes = {
  submittedFieldValues: PropTypes.object,
  items: PropTypes.array,
  id: PropTypes.string,
  resultId: PropTypes.string,
  paginate: PropTypes.bool,
  scroll: PropTypes.bool,
  hasSearchInfoPanel: PropTypes.bool,
  searchTermName: PropTypes.string,
  onClick: PropTypes.func,
  onResultHover: PropTypes.func,
  searchTips: PropTypes.array,
  displaySearchTipsOnNoResults: PropTypes.bool,
  hidePaginatorOnNoResults: PropTypes.bool
}

export default PeopleResult
