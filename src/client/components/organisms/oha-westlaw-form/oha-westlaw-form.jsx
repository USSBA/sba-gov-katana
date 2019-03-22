import React from 'react'
import styles from './oha-westlaw-form.scss'

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

  handleSubmit(event, searchData) {
    const { method, query } = searchData
    // if (Q.length < 1) {
    //   alert("Please enter a number.");
    // }
    event.preventDefault()
    const finalQuery = encodeURIComponent(query)
    const url = `https://govt.westlaw.com/sbaoha/Search/Results?t_Method=${method}_querytext=${finalQuery}`
    window.location = url
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { title } = this.props
    const { appealNumber, appellantName, tncText, tncDecisionType, tncDate, winText } = this.state

    return (
      <div>
        <h1>{title}</h1>
        <div>
          <form onSubmit={e => this.handleSubmit(e, { method: 'tnc&t', query: `CI(${appealNumber})` })}>
            <legend>Search by Appeal Number</legend>
            <label>
              Enter numeric portion only:
              <input
                name="appealNumber"
                type="number"
                value={appealNumber}
                onChange={e => this.handleChange(e)}
              />
            </label>
            <input type="submit" value="Go" />
            Example: 5248
          </form>
        </div>
        <div>
          <form onSubmit={e => this.handleSubmit(e, { method: 'tnc&t', query: `TI(${appellantName})` })}>
            <legend>Search by Appellant Name</legend>
            <label>
              Enter name:
              <input
                name="appellantName"
                type="text"
                value={appellantName}
                onChange={e => this.handleChange(e)}
              />
            </label>
            <input type="submit" value="Go" />
            Examples: ACME "Secure Network Systems"
          </form>
        </div>
        <div>
          <form onSubmit={e => this.handleSubmit(e, { method: 'win&t', query: `${winText}` })}>
            <legend>Plain text search</legend>
            <label>
              Enter search terms:
              <input name="winText" type="text" value={winText} onChange={e => this.handleChange(e)} />
            </label>
            <input type="submit" value="Go" />
            Example: ostensible subcontractor
          </form>
        </div>
        <div>
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
            <legend>Plain text search</legend>
            <label>
              Enter search terms:
              <input name="tncText" type="term" value={tncText} onChange={e => this.handleChange(e)} />
            </label>
            <label>Decision type (optional)</label>
            <select name="tncDecisionType" value={tncDecisionType} onChange={e => this.handleChange(e)}>
              <option value="" defaultValue>
                All
              </option>
              <option value="BDP! MSB!">8(a) Business Development</option>
              <option value="DEV">Development Company</option>
              <option value="WOSB!">Economically-Disadvantaged Women-Owned Small Business</option>
              <option value="NAI! SIC!">NAICS & SIC</option>
              <option value="VET! SDV!">Service-Disabled Veteran Owned Small Business Concern</option>
              <option value="SIZ!">Size Decisions</option>
              <option value="SDB!">Small Disadvantaged Business Decisions</option>
              <option value="WBC">Women's Business Center</option>
              <option value="WOSB!">Women-Owned Small Business</option>
            </select>
            <label>Date Restriction (optional)</label>
            <select name="tncDate" value={tncDate} onChange={e => this.handleChange(e)}>
              <option value="" defaultValue>
                None
              </option>
              <option value="last 3 months">Last 3 Months</option>
              <option value="last 6 months">Last 6 Months</option>
              <option value="last 1 year">Last 1 Year</option>
              <option value="last 3 years">Last 3 years</option>
              <option value="last 10 years">Last 10 Years</option>
            </select>
            <input type="submit" value="Go" />
            Example: ostensible subcontractor
          </form>
        </div>
      </div>
    )
  }
}

export default OHAWestlawForm
