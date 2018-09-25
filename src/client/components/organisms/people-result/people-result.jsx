import React from 'react'
import { isEmpty } from 'lodash'

import styles from './people-result.scss'
import { Button, Loader, MultiSelect, SearchIcon, TextInput } from 'atoms'
import { Paginator } from 'molecules'
import { DetailCardCollection } from 'organisms'

// const createSlug = str => {
//   return str
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
//     .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
//     .replace(/^-+|-+$/g, '')
// }

// const createCamelCase = (str) => {
//
//   const sliceIndex = 1;
//   const _str = str[0].toLowerCase() + str.slice(sliceIndex);
//   return _str.replace(" ", "");
//
// };

export class PeopleResult extends React.Component {
  renderCards() {
    let result = (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    )

    const { offices, people } = this.props

    if (!isEmpty(offices) && !isEmpty(people)) {
      const peopleWithOfficeMatch = people.map(person => {
        let idMatch = offices.find(office => office.id === person.office)
        return idMatch ? { ...person, office: idMatch.title } : person
      })
      result = <DetailCardCollection cards={peopleWithOfficeMatch} type={peopleWithOfficeMatch[0].type} />
    } else if ((offices === null && isEmpty(offices)) || (people === null && isEmpty(people))) {
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
      <div>
        <div className={styles.result}>{this.renderCards()}</div>
      </div>
    )
  }
}

export default PeopleResult
