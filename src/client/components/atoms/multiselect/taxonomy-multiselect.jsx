import React from 'react'
import { MultiSelect } from 'atoms'
import { camelCase, startCase } from 'lodash'
import PropTypes from 'prop-types'

class TaxonomyMultiSelect extends React.Component {
  createSlug(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
      .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
      .replace(/^-+|-+$/g, '')
  }

  generatePropsFromTaxonomy() {
    const { taxonomy, includeAllOption, label } = this.props
    const { name } = taxonomy
    const id = `${this.createSlug(name)}-select`
    const stateName = camelCase(name)
    const taxonomyTerms = includeAllOption ? ['All', ...taxonomy.terms] : taxonomy.terms
    const options = taxonomyTerms.map(entry => {
      return { label: entry, value: entry }
    })

    const multiselectProps = {
      id: id,
      name: id,
      value: this.props.filterValues[name] || 'All',
      options: options
    }

    return multiselectProps
  }

  render() {
    console.log('PPRAWPS', this.props)
    const generatedProps = this.generatePropsFromTaxonomy()
    return <MultiSelect {...generatedProps} {...this.props} />
  }
}

TaxonomyMultiSelect.propTypes = {
  // taxonomy: PropTypes.object.isRequired,
  // label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  includeAllOption: PropTypes.bool,
  filterValues: PropTypes.object
}

TaxonomyMultiSelect.defaultProps = {
  includeAllOption: true,
  filterValues: {}
}

export default TaxonomyMultiSelect
