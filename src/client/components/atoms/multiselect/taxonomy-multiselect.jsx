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
    const { taxonomy, includeAllOption, label, value } = this.props
    const { name } = taxonomy
    const id = `${this.createSlug(name)}-select`
    const stateName = camelCase(name)
    const taxonomyTerms = includeAllOption ? ['All', ...taxonomy.terms] : taxonomy.terms
    const options = taxonomyTerms.map(entry => {
      return { label: entry, value: entry }
    })

    let _value = ''
    if (options.length) {
      const needle = typeof value === 'string' ? { label: value, value } : value
      const defaultValue = options.find(option => option.value === needle.value)
      _value = defaultValue || options[0].value
    }

    const multiselectProps = {
      id: id,
      name: id,
      options: options,
      value: _value
    }

    return multiselectProps
  }

  render() {
    const generatedProps = this.generatePropsFromTaxonomy()
    return (
      <div className={this.props.className}>
        <MultiSelect {...this.props} {...generatedProps} />
      </div>
    )
  }
}

TaxonomyMultiSelect.propTypes = {
  // taxonomy: PropTypes.object.isRequired,
  // label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  includeAllOption: PropTypes.bool,
  filterValues: PropTypes.object,
  value: PropTypes.string
}

TaxonomyMultiSelect.defaultProps = {
  includeAllOption: true,
  filterValues: {},
  value: ''
}

export default TaxonomyMultiSelect
