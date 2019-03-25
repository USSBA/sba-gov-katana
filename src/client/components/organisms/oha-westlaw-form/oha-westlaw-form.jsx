import React from 'react'

import { Button } from 'atoms'
import styles from './oha-westlaw-form.scss'

const selectOptions = {
  tncDecisionType: [
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
  ],
  tncDate: [
    { value: '', label: 'None' },
    { value: 'last 3 months', label: 'Last 3 Months' },
    { value: 'last 6 months', label: 'Last 6 Months' },
    { value: 'last 1 year', label: 'Last 1 Year' },
    { value: 'last 3 years', label: 'Last 3 Years' },
    { value: 'last 10 years', label: 'Last 10 Years' }
  ]
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
    window.location = url
  }

  renderOption(optionName) {
    return (
      <select name={optionName} value={this.state[optionName]} onChange={e => this.handleChange(e)}>
        {selectOptions[optionName].map(({ label, value }, index) => {
          return (
            <option key={index} value={value}>
              {label}
            </option>
          )
        })}
      </select>
    )
  }

  render() {
    const { appealNumber, appellantName, tncDate, tncDecisionType, tncText, winText } = this.state

    return (
      <div>
        <h2>{this.props.title}</h2>
        <form onSubmit={e => this.handleSubmit(e, { method: 'tnc&t', query: `CI(${appealNumber})` })}>
          <h3>Search by Appeal Number</h3>
          <label>
            Enter numeric portion only:
            <input
              name="appealNumber"
              type="number"
              value={appealNumber}
              onChange={e => this.handleChange(e)}
              required
            />
            Example: 5248
          </label>
          <Button id="appeal-number-submit" type="submit" primary>
            Go
          </Button>
        </form>
        <form onSubmit={e => this.handleSubmit(e, { method: 'tnc&t', query: `TI(${appellantName})` })}>
          <h3>Search by Appellant Name</h3>
          <label>
            Enter name:
            <input
              name="appellantName"
              type="text"
              value={appellantName}
              onChange={e => this.handleChange(e)}
              required
            />
            Examples: ACME "Secure Network Systems"
          </label>
          <Button id="appellant-name-submit" type="submit" primary>
            Go
          </Button>
        </form>
        <form onSubmit={e => this.handleSubmit(e, { method: 'win&t', query: `${winText}` })}>
          <h3>Plain text search</h3>
          <label>
            Enter search terms:
            <input
              name="winText"
              type="text"
              value={winText}
              onChange={e => this.handleChange(e)}
              required
            />
            Example: ostensible subcontractor
          </label>
          <Button id="win-text-submit" type="submit" primary>
            Go
          </Button>
        </form>
        <form
          onSubmit={e =>
            this.handleSubmit(e, {
              method: 'tnc&t',
              query: `${tncText}${tncDecisionType !== '' ? `& pr(${tncDecisionType})` : ''}${
                tncDate !== '' ? `& da(${tncDate})` : ''
              }`
            })
          }
        >
          <h3>Boolean search with field limits</h3>
          <label>
            Enter search terms:
            <input
              name="tncText"
              type="text"
              value={tncText}
              onChange={e => this.handleChange(e)}
              required
            />
            Example: ostensible subcontractor
          </label>
          <label>Decision type (optional)</label>
          {this.renderOption('tncDecisionType')}
          <label>Date Restriction (optional)</label>
          {this.renderOption('tncDate')}
          <Button id="win-text-submit" type="submit" primary>
            Go
          </Button>
        </form>
      </div>
    )
  }
}

export default OHAWestlawForm
