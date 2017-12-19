import React, { PureComponent } from 'react'
import { SmallInverseSecondaryButton, TextInput } from 'atoms'

class SearchPage extends PureComponent {
  constructor() {
    super()

    this.state = {
      searchTerm: ''
    }
  }

  componentWillMount() {
    const searchTerm = document.location.search.split('?q=')[1]

    this.setState({ searchTerm })
  }

  render() {
    const { searchTerm } = this.state

    return (
      <div>
        <h1>Search</h1>
        <SearchBar searchTerm={searchTerm} />
      </div>
    )
  }
}

const SearchBar = props => {
  const { searchTerm } = props

  return (
    <div>
      <TextInput
        id="search"
        errorText={'Please enter the correct thing.'}
        label="What are you looking for?"
        validationState={''}
        value={searchTerm}
      />
      <SmallInverseSecondaryButton url="#" text="Search" />
    </div>
  )
}

export default SearchPage
