import React from 'react'
import createFragment from 'react-addons-create-fragment'
import { kebabCase } from 'lodash'

import { Button, MultiSelect } from 'atoms'
import styles from './oha-westlaw-form.scss'

const selectOptions = {
  tncDecisionType: {
    dropdownLabel: 'Decision type (optional)',
    option: [
      { value: '', label: 'All' },
      { value: 'BDP! MSB!', label: '8(a) Business Development' },
      { value: 'DEV', label: 'Development Company' },
      { value: 'WOSB!', label: 'Economically-Disadvantaged Women-Owned Small Business' },
      { value: 'NAI! SIC!', label: 'NAICS & SIC' },
      { value: 'VET! SDV!', label: 'Service-Disabled Veteran Owned Small Business Concern' },
      { value: 'SIZ!', label: 'Size Decisions' },
      { value: 'SDB!', label: 'Small Disadvantaged Business Decisions' },
      { value: 'WBC', label: "Women's Business Center" },
      { value: 'WOSB!', label: 'Women-Owned Small Business' }
    ]
  },
  tncDate: {
    dropdownLabel: 'Date Restriction (optional)',
    option: [
      { value: '', label: 'None' },
      { value: 'last 3 months', label: 'Last 3 Months' },
      { value: 'last 6 months', label: 'Last 6 Months' },
      { value: 'last 1 year', label: 'Last 1 Year' },
      { value: 'last 3 years', label: 'Last 3 Years' },
      { value: 'last 10 years', label: 'Last 10 Years' }
    ]
  }
}

class OHAWestlawForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appealNumber: '',
      appellantName: '',
      tncText: '',
      tncDecisionType: '',
      tncDate: '',
      winText: ''
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event, searchData) {
    const { method, query } = searchData
    const finalQuery = encodeURIComponent(query)
    const url = `https://govt.westlaw.com/sbaoha/Search/Results?t_Method=${method}_querytext=${finalQuery}`

    event.preventDefault()
    this.changeLocation(url)
  }

  changeLocation(url) {
    window.location = url
  }

  renderOption(optionName) {
    const config = [
      {
        id: `${kebabCase(optionName)}-select`,
        onChange: selectedOption => {
          const { value } = selectedOption
          this.setState({ [optionName]: value })
        },
        label: selectOptions[optionName].dropdownLabel,
        name: optionName,
        options: selectOptions[optionName].option,
        value: this.state[optionName]
      }
    ]

    return config.map((multiselectProps, index) => {
      return (
        <MultiSelect
          {...multiselectProps}
          className={styles.multiselect}
          onBlur={() => {
            return null
          }}
          onFocus={() => {
            return null
          }}
          key={index}
          validationState=""
          errorText=""
          autoFocus={false}
          multi={false}
        />
      )
    })
  }

  renderForms() {
    const formData = [
      {
        jsx: (
          <div id="appealNumber" key={1}>
            <h3>Search by Appeal Number</h3>
            <label>
              Enter numeric portion only:
              <input
                id="appeal-number-textbox"
                name="appealNumber"
                type="number"
                value={this.state.appealNumber}
                onChange={e => this.handleChange(e)}
              />
              <span className={styles.example}>Example: 5248</span>
            </label>
            <Button id="appeal-number-submit" type="submit" primary>
              Go
            </Button>
          </div>
        ),
        query: { method: 'tnc&t', query: `CI(${this.state.appealNumber})` }
      },
      {
        jsx: (
          <div id="appellantName" key={2}>
            <h3>Search by Appellant Name</h3>
            <label>
              Enter name:
              <input
                id="appellant-name-textbox"
                name="appellantName"
                type="text"
                value={this.state.appellantName}
                onChange={e => this.handleChange(e)}
                required
              />
              <span className={styles.example}>Examples: ACME "Secure Network Systems"</span>
            </label>
            <Button id="appellant-name-submit" type="submit" primary>
              Go
            </Button>
          </div>
        ),
        query: { method: 'tnc&t', query: `TI(${this.state.appellantName})` }
      },
      {
        jsx: (
          <div id="winText" key={3}>
            <h3>Plain text search</h3>
            <label>
              Enter search terms:
              <input
                id="win-textbox"
                name="winText"
                type="text"
                value={this.state.winText}
                onChange={e => this.handleChange(e)}
                required
              />
              <span className={styles.example}>Example: ostensible subcontractor</span>
            </label>
            <Button id="win-text-submit" type="submit" primary>
              Go
            </Button>
          </div>
        ),
        query: { method: 'win&t', query: `${this.state.winText}` }
      },
      {
        jsx: (
          <div id="tncText" key={4}>
            <h3>Boolean search with field limits</h3>
            <label>
              Enter search terms:
              <input
                id="tnc-textbox"
                name="tncText"
                type="text"
                value={this.state.tncText}
                onChange={e => this.handleChange(e)}
                required
              />
              <span className={styles.example}>
                Example: 134.202(d) &nbsp;&nbsp;&nbsp;&nbsp; non-manufacture &nbsp;&nbsp;&nbsp;&nbsp;
                "ostensible subcontractor"
              </span>
            </label>
            {this.renderOption('tncDecisionType')}
            {this.renderOption('tncDate')}
            <Button id="tnc-text-submit" type="submit" primary>
              Go
            </Button>
          </div>
        ),
        query: {
          method: 'tnc&t',
          query: `${this.state.tncText}${
            this.state.tncDecisionType !== '' ? `& pr(${this.state.tncDecisionType})` : ''
          }${this.state.tncDate !== '' ? `& da(${this.state.tncDate})` : ''}`
        }
      }
    ]

    return formData.map(({ jsx, query }, index) => (
      <form className={styles.westlawForm} onSubmit={e => this.handleSubmit(e, query)} key={index}>
        {jsx}
      </form>
    ))
  }

  render() {
    const { appealNumber, appellantName, tncDate, tncDecisionType, tncText, winText } = this.state

    return (
      <div id="westlaw-form">
        <h2>{this.props.title}</h2>
        {this.renderForms()}
      </div>
    )
  }
}

export default OHAWestlawForm
