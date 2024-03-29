import React, { PureComponent } from 'react'
import NumberFormat from 'react-number-format'
import axios from 'axios'
import { endsWith, isEmpty, reduce } from 'lodash'

import sizeStandardsGraphic from 'assets/images/tools/size-standards-tool/size_standards.png'
import styles from './size-standards-tool.scss'
import { Button, SearchIcon, TextInput } from 'atoms'
import { Typeahead } from 'molecules'

const formatRevenueLimit = revenueLimit => {
  const annualRevenueConstant = 1000000
  let result = (Number(revenueLimit) * annualRevenueConstant)
    .toString()
    .split(/(?=(?:\d{3})+(?:\.|$))/g)
    .join(',')
  result = '$' + result

  return result
}

const formatEmployeeCountLimit = employeeCountLimit => {
  const result = Number(employeeCountLimit)
    .toString()
    .split(/(?=(?:\d{3})+(?:\.|$))/g)
    .join(',')

  return result
}

class SizeStandardsTool extends PureComponent {
  constructor() {
    super()

    this.state = {
      section: 'START', // START | NAICS | REVENUE | EMPLOYEES | RESULTS

      naicsCodes: [],
      selectedNaicsCodes: [], //

      shouldShowRevenueSection: false,
      revenueTotal: null,

      shouldShowEmployeesSection: false,
      employeeTotal: null
    }

    this.origState = Object.assign({}, this.state)
  }

  componentDidMount() {
    axios
      .get('/naics')
      .then(response => {
        const naicsCodes = response.data.filter(object => {
          let result
          let isDisabled
          const { id, assetLimit } = object
          const { disabledNaicsCodes } = this.props

          // if
          // - this naicsCode is not in the disabled list
          // - assetLimit is NOT set
          // - - create code property that matches id property
          // - - return result

          if (
            disabledNaicsCodes.find(disabledCode => {
              let bln

              if (id === disabledCode) {
                bln = true
              }

              return bln
            })
          ) {
            isDisabled = true
          } else if (!isEmpty(assetLimit)) {
            isDisabled = true
          }

          if (!isDisabled) {
            result = object
            result.code = id
          }

          return result
        })

        this.setState({ naicsCodes })
      })
      .catch(error => {
        // console.error(error)
      })
  }

  gotoSection(section) {
    let data = {
      section
    }

    // switch section

    // case START
    // carry over already cached naics codes
    // case REVENUE
    // reset revenueTotal value to null
    // case EMPLOYEES
    // reset employeeTotal value to null
    // case RESULTS section
    // set focus to application level

    switch (section) {
      case 'START':
        data = Object.assign({}, this.origState)
        data.naicsCodes = this.state.naicsCodes.map(object => {
          const _object = object

          // remove any "isSmallBusiness" mutations
          if (_object.hasOwnProperty('isSmallBusiness')) {
            delete _object.isSmallBusiness
          }

          return _object
        })

        break

      case 'REVENUE':
        data.revenueTotal = null

        break

      case 'EMPLOYEES':
        data.employeeTotal = null

        break

      case 'RESULTS':
        this.setFocusTo('size-standards-tool')

        break

      default:
        break
    }

    this.setState(data, () => {
      window.scrollTo(0, 0)
    })
  }

  setFocusTo(id, delay = 0) {
    const interval = setInterval(() => {
      const element = document.getElementById(id)

      if (!isEmpty(element)) {
        element.focus()

        if (id === 'size-standards-tool') {
          window.scrollTo(0, 0)
        }

        clearInterval(interval)
      }
    }, delay)
  }

  onInputChange(data) {
    const { section, value } = data

    switch (section) {
      case 'REVENUE':
        this.setState({ revenueTotal: value })

        break

      case 'EMPLOYEES':
        this.setState({ employeeTotal: value })

        break

      default:
        break
    }
  }

  addNaicsCode(code) {
    const { naicsCodes } = this.state
    const selectedNaicsCodes = this.state.selectedNaicsCodes.slice()

    let isNaicsCodeInList

    selectedNaicsCodes.find(object => {
      if (object.code === code) {
        isNaicsCodeInList = true
      }

      return false
    })

    if (!isNaicsCodeInList) {
      const selectedCode = naicsCodes.find(object => {
        let result

        if (object.code === code) {
          result = object
        }

        return result
      })

      if (selectedCode) {
        selectedNaicsCodes.push(selectedCode)
      }

      const updatedState = {
        selectedNaicsCodes
      }

      if (selectedCode.revenueLimit !== null) {
        updatedState.shouldShowRevenueSection = true
      }

      if (selectedCode.employeeCountLimit !== null) {
        updatedState.shouldShowEmployeesSection = true
      }

      this.setState(updatedState)
    }
  }

  removeNaicsCode(code) {
    let shouldShowRevenueSection, shouldShowEmployeesSection

    const filteredList = this.state.selectedNaicsCodes.filter(object => {
      let result

      if (object.code !== code) {
        shouldShowRevenueSection = object.revenueLimit !== null
        shouldShowEmployeesSection = object.employeeCountLimit !== null
        result = object
      }

      return result
    })

    this.setState({
      selectedNaicsCodes: filteredList,
      shouldShowRevenueSection,
      shouldShowEmployeesSection
    })
  }

  renderAppBar(data) {
    const { buttonText, renderNextButton, sectionTarget } = data

    return (
      <div className={`${styles.appBar} back-button`}>
        <Button
          onClick={() => {
            this.gotoSection(sectionTarget)
            this.setFocusTo('size-standards-tool')
          }}
          responsive={false}
          secondary
        >
          {buttonText}
        </Button>
        {renderNextButton ? (
          renderNextButton()
        ) : (
          <div>{/* Return an empty div that can be used as a placeholder in the grid. */}</div>
        )}
      </div>
    )
  }

  render() {
    const {
      employeeTotal,
      naicsCodes,
      revenueTotal,
      section,
      selectedNaicsCodes,
      shouldShowEmployeesSection,
      shouldShowRevenueSection
    } = this.state

    return (
      <div className={styles.sizeStandardsTool} id="size-standards-tool" tabIndex="-1">
        {section === 'START' && (
          <div className={styles.startSection}>
            <StartScreen gotoSection={this.gotoSection.bind(this)} />
          </div>
        )}

        {section === 'NAICS' && (
          <div>
            <NaicsScreen
              // expose applicaton state
              {...this.state}
              // expose the following methods
              addNaicsCode={this.addNaicsCode.bind(this)}
              removeNaicsCode={this.removeNaicsCode.bind(this)}
              setFocusTo={this.setFocusTo.bind(this)}
              gotoSection={this.gotoSection.bind(this)}
            />

            {this.renderAppBar({
              buttonText: 'BACK',
              renderNextButton: () => {
                if (selectedNaicsCodes.length === 0) {
                  return <div />
                }

                return (
                  <Button
                    onClick={() => {
                      let sectionTarget = 'NO_SECTION_SET'

                      if (shouldShowRevenueSection === true) {
                        sectionTarget = 'REVENUE'
                      } else if (shouldShowEmployeesSection === true) {
                        sectionTarget = 'EMPLOYEES'
                      }

                      this.gotoSection(sectionTarget)
                    }}
                    primary
                    responsive={false}
                  >
                    Next
                  </Button>
                )
              },
              sectionTarget: 'START'
            })}
          </div>
        )}

        {section === 'REVENUE' && (
          <div>
            <RevenueScreen
              // expose applicaton state
              {...this.state}
              // expose the following methods
              onInputChange={this.onInputChange.bind(this)}
              setFocusTo={this.setFocusTo.bind(this)}
              gotoSection={this.gotoSection.bind(this)}
            />

            {this.renderAppBar({
              buttonText: 'BACK',
              renderNextButton: () => (
                <Button
                  disabled={!(revenueTotal > 0)}
                  onClick={() => this.gotoSection(shouldShowEmployeesSection ? 'EMPLOYEES' : 'RESULTS')}
                  primary
                  responsive={false}
                >
                  {shouldShowEmployeesSection ? 'Next' : 'See results'}
                </Button>
              ),
              sectionTarget: 'NAICS'
            })}
          </div>
        )}

        {section === 'EMPLOYEES' && (
          <div>
            <EmployeesScreen
              // expose applicaton state
              {...this.state}
              // expose the following methods
              onInputChange={this.onInputChange.bind(this)}
              setFocusTo={this.setFocusTo.bind(this)}
              gotoSection={this.gotoSection.bind(this)}
            />

            {this.renderAppBar({
              buttonText: 'BACK',
              renderNextButton: () => (
                <Button
                  disabled={!(employeeTotal > 0)}
                  onClick={() => this.gotoSection('RESULTS')}
                  primary
                  responsive={false}
                >
                  See results
                </Button>
              ),
              sectionTarget: shouldShowRevenueSection ? 'REVENUE' : 'NAICS'
            })}
          </div>
        )}

        {section === 'RESULTS' && (
          <div className={styles.resultsSection}>
            <ResultsScreen
              // expose applicaton state
              {...this.state}
            />

            {this.renderAppBar({
              buttonText: 'START OVER',
              sectionTarget: 'START'
            })}
          </div>
        )}
      </div>
    )
  }
}

// "START" Screen (stateless)
const StartScreen = props => {
  return (
    <div id="start-screen">
      <h2>Size Standards Tool</h2>

      <img src={sizeStandardsGraphic} alt="Illustration of a business being measured by rulers." />

      <p>Do you qualify as a small business for government contracting purposes?</p>

      <div className={`${styles.button} submit-button`}>
        <Button onClick={() => props.gotoSection('NAICS')} primary>
          Start
        </Button>
      </div>
    </div>
  )
}

// "NAICS" Screen (holds state for "shouldShowNaicsInput")
class NaicsScreen extends PureComponent {
  constructor() {
    super()

    this.state = {
      shouldShowNaicsInput: true
    }
  }

  showNaicsInput(shouldShowNaicsInput) {
    const updatedState = { shouldShowNaicsInput }

    this.setState(updatedState)
  }

  renderTypeahead() {
    // Format the list of naics from the API into a structure suitable for React
    // Autosuggest, i.e. into a list of sections (naics categories/industries) that
    // contain entries (naics codes and descriptions).
    function formatNaics(naics) {
      const industriesMap = {}
      for (let index = 0; index < naics.length; index++) {
        const { code, description, sectorDescription: industryDescription, sectorId: industryCode } = naics[
          index
        ]

        if (!industriesMap.hasOwnProperty(industryCode)) {
          industriesMap[industryCode] = {
            description: industryDescription,
            entries: []
          }
        }

        industriesMap[industryCode].entries.push({
          code,
          description,
          industryCode,
          industryDescription
        })
      }

      return reduce(
        industriesMap,
        (acc, val, key) => {
          acc.push({
            description: val.description,
            entries: val.entries
          })

          return acc
        },
        []
      )
    }

    // do not allow NAICS Codes:
    // - that are exceptions
    // then format the remaining objects
    const naics = formatNaics(
      this.props.naicsCodes.filter(object => {
        let result

        if (!endsWith(object.code, '_Except')) {
          result = object
        }

        return result
      })
    )

    const inputProps = {
      id: 'naics-lookup',
      name: 'naics',
      'aria-labelledby': 'instructions',
      placeholder: 'Search by NAICS code or keyword'
      // onBlur,
      // onFocus
    }

    return (
      <div className={styles.typeahead}>
        <Typeahead
          naics={naics}
          inputProps={inputProps}
          inputLengthToGetSuggestions={3}
          maxVisibleSuggestions={5}
          onSelect={selection => {
            // const {
            //   code,
            //   description,
            //   industryCode,
            //   industryDescription
            // } = selection;

            const naicsCode = selection.code
            this.props.addNaicsCode(naicsCode)
            this.showNaicsInput(false)
            this.props.setFocusTo('add-another-industry')
          }}
        />
      </div>
    )
  }

  renderNaicsList() {
    const { selectedNaicsCodes } = this.props

    const listItems = selectedNaicsCodes.map((object, index) => {
      const { code, description } = object

      return (
        <li key={index}>
          <div className={styles.naicsSection}>
            <div className={styles.left + ' left'}>
              <p>
                <span>{code} </span>
              </p>
              <p>{description}</p>
            </div>

            <div className={styles.right + ' right'}>
              <a
                aria-label={'Remove NAICS code ' + code + '.'}
                className={styles.remove + ' remove'}
                onClick={() => {
                  this.props.removeNaicsCode(code)
                }}
                onKeyPress={obj => {
                  const enterKeyCode = 0

                  if (obj.keyCode === enterKeyCode) {
                    this.props.removeNaicsCode(code)
                  }
                }}
                tabIndex="0"
              >
                <i className="fa fa-times" aria-hidden="true" />
              </a>
            </div>
          </div>
        </li>
      )
    })

    return <ul className={styles.naicsCodesList + ' naics-codes-list'}>{listItems}</ul>
  }

  render() {
    const {
      section,
      selectedNaicsCodes,
      naicsCodes,
      shouldShowRevenueSection,
      shouldShowEmployeesSection
    } = this.props

    const { shouldShowNaicsInput } = this.state

    return (
      <div id="naics-screen" className={styles.screen}>
        <h2>What's your industry?</h2>

        {selectedNaicsCodes.length > 0 && <div>{this.renderNaicsList()}</div>}

        {shouldShowNaicsInput || selectedNaicsCodes.length === 0 ? (
          <div>
            <div className={styles.naicsCodeInput}>
              {!isEmpty(naicsCodes) ? (
                <div>
                  <div id="instructions" className={styles.instructions}>
                    <p>Select your 6-digit NAICS code</p>
                  </div>

                  {this.renderTypeahead()}
                  {this.props.setFocusTo('naics-lookup', 300)}

                  <p>
                    The North American Industry Classification System (NAICS) classifies businesses
                    according to type of economic activity.
                  </p>
                  <p>
                    If you don't know which NAICS code to select, visit{' '}
                    <a href="https://census.gov/eos/www/naics/" target="_blank" rel="noopener">
                      census.gov
                    </a>{' '}
                    for a comprehensive search and listing.
                  </p>
                </div>
              ) : (
                <div className={styles.loading}>
                  <p>...loading suggestions...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>
              <a
                id="add-another-industry"
                onClick={() => {
                  this.showNaicsInput(true)
                }}
                onKeyPress={obj => {
                  const enterKeyCode = 0

                  if (obj.keyCode === enterKeyCode) {
                    this.showNaicsInput(true)
                  }
                }}
                tabIndex="0"
              >
                <i className="fa fa-plus" aria-hidden="true" />
                Add another industry
              </a>
            </p>
          </div>
        )}
      </div>
    )
  }
}

// "REVENUE" Screen (stateless)
const RevenueScreen = props => {
  const { section, revenueTotal, shouldShowEmployeesSection } = props

  let revenueInputValidationState = ''

  if (revenueTotal !== null) {
    revenueInputValidationState = revenueTotal > 0 ? 'success' : 'error'
  }

  return (
    <div id="revenue-screen" className={styles.screen}>
      <h2>How much average annual receipts/revenue?</h2>

      <div className={styles.revenueInput}>
        <label htmlFor="revenue">Five-year Average</label>

        <NumberFormat
          id="revenue"
          thousandSeparator={true}
          placeholder="$"
          prefix={'$'}
          onValueChange={({ value }) => {
            const data = {
              section,
              value
            }

            props.onInputChange(data)
          }}
        />

        {props.setFocusTo('revenue')}
      </div>

      <p>
        Your average annual receipts/revenue is generally calculated as your total receipts/revenue or total
        income plus cost of goods sold (including all affiliates, if any) over the latest completed five
        (5) fiscal years divided by five (5). See{' '}
        <a href="https://www.law.cornell.edu/cfr/text/13/121.104" target="_blank" rel="noopener">
          13 CFR 121.104
        </a>{' '}
        for details.
      </p>
    </div>
  )
}

// "EMPLOYEES" Screen (stateless)
const EmployeesScreen = props => {
  const { section, employeeTotal } = props

  let employeesInputValidationState = ''
  if (employeeTotal !== null) {
    employeesInputValidationState = employeeTotal > 0 ? 'success' : 'error'
  }

  return (
    <div id="employees-screen" className={styles.screen}>
      <h2>How many employees?</h2>

      <div className={styles.employeesInput}>
        <label htmlFor="employees">Number of employees</label>

        <NumberFormat
          id="employees"
          thousandSeparator={true}
          onValueChange={({ value }) => {
            const data = {
              section,
              value
            }

            props.onInputChange(data)
          }}
        />

        {props.setFocusTo('employees')}
      </div>

      <p>
        This should be the average number of full-time or part-time <br />
        employees over the last 12 months.
      </p>
    </div>
  )
}

// "RESULTS" Screen (holds state of a copy of selectedNaicsCodes)
class ResultsScreen extends PureComponent {
  constructor() {
    super()

    this.state = {
      selectedNaicsCodes: [],
      isEligibleForContractingPrograms: false
    }
  }

  getResults() {
    // caculate results for every entry in selectedNaicsCodes

    const selectedNaicsCodes = this.props.selectedNaicsCodes.slice()

    const { naicsCodes, revenueTotal, employeeTotal } = this.props

    // add any exceptions to the selectedNaicsCodes array.

    const exceptions = []

    for (let i = 0; i < selectedNaicsCodes.length; i++) {
      for (let j = 0; j < naicsCodes.length; j++) {
        if (selectedNaicsCodes[i].code === naicsCodes[j].parent) {
          exceptions.push(naicsCodes[j])
        }
      }
    }

    for (let k = 0; k < exceptions.length; k++) {
      selectedNaicsCodes.push(exceptions[k])
    }

    const promises = selectedNaicsCodes.map((object, index) => {
      const params = {
        id: object.id,
        revenue: revenueTotal,
        employeeCount: employeeTotal
      }

      return axios
        .get('/isSmallBusiness', {
          params
        })
        .then(response => {
          // map small business result to it's
          // corresponding selectedNaicsCodes member

          const isSmallBusiness = JSON.parse(response.data) // boolean

          selectedNaicsCodes[index].isSmallBusiness = isSmallBusiness

          // if this comes back as true
          // then this business may be eligible for contracting programs

          if (isSmallBusiness) {
            this.setState({ isEligibleForContractingPrograms: true })
          }
        })
        .catch(error => {
          // console.error(error)
        })
    })

    Promise.all(promises).then(response => {
      // delay call for user feedback

      const delay = 1000
      const timeout = setTimeout(() => {
        this.setState({ selectedNaicsCodes })

        clearTimeout(timeout)
      }, delay)
    })
  }

  renderNaicsExceptionsList(code) {
    const { naicsCodes } = this.props

    let index = 0

    const exceptions = naicsCodes.map(object => {
      const { parent } = object

      let result

      // exceptions are naics codes with parents
      if (parent === code) {
        index++

        result = (
          <li key={index}>
            <div>
              <div className={styles.left + ' left'}>
                <p>
                  <span>Exception #{index} </span>
                </p>
                <div>
                  <p>{object.description}</p>
                </div>
              </div>

              <div className={styles.middle + ' middle'}>
                <p>
                  <span>Small Business Size Standards </span>
                </p>

                {object.revenueLimit !== null ? (
                  <div>
                    <p>{formatRevenueLimit(object.revenueLimit)} annual revenue</p>
                  </div>
                ) : (
                  <div>
                    <p>{formatEmployeeCountLimit(object.employeeCountLimit)} employees</p>
                  </div>
                )}
              </div>

              <div className={styles.right + ' right'}>
                {object.isSmallBusiness ? (
                  <div>
                    <div className={styles.yes + ' yes'}>
                      <p>
                        <i className="fa fa-check-circle" aria-hidden="true" />
                        YES
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={styles.no + ' no'}>
                      <p>
                        <i className="fa fa-times-circle" aria-hidden="true" />
                        NO
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        )
      }

      return result
    })

    return <ul className={styles.exceptionsList + ' exceptions-list'}>{exceptions}</ul>
  }

  renderNaicsList() {
    const listItems = this.state.selectedNaicsCodes.map((object, index) => {
      const { code, description } = object

      let result

      if (!endsWith(object.code, '_Except')) {
        result = (
          <li key={index}>
            <div>
              <div className={styles.resultsSection}>
                <div className={styles.left + ' left'}>
                  <p>
                    <span>{code} </span>
                  </p>
                  <div>
                    <p>{description}</p>
                  </div>
                </div>

                <div className={styles.middle + ' middle'}>
                  <p>
                    <span>Small Business Size Standards </span>
                  </p>

                  {object.revenueLimit !== null ? (
                    <div>
                      <p>{formatRevenueLimit(object.revenueLimit)} annual revenue</p>
                    </div>
                  ) : (
                    <div>
                      <p>{formatEmployeeCountLimit(object.employeeCountLimit)} employees</p>
                    </div>
                  )}
                </div>

                <div className={styles.right + ' right'}>
                  {object.isSmallBusiness ? (
                    <div>
                      <div className={styles.yes + ' yes'}>
                        <p>
                          <i className="fa fa-check-circle" aria-hidden="true" />
                          YES
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={styles.no + ' no'}>
                        <p>
                          <i className="fa fa-times-circle" aria-hidden="true" />
                          NO
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {this.renderNaicsExceptionsList(code)}
            </div>
          </li>
        )
      }

      return result
    })

    return <ul className={styles.naicsCodesList + ' naics-codes-list'}>{listItems}</ul>
  }

  render() {
    const { selectedNaicsCodes, section } = this.props

    const { isEligibleForContractingPrograms } = this.state

    return (
      <div id="results-screen" className={styles.screen}>
        <h2>Are you a small business eligible for government contracting?</h2>

        {!isEmpty(this.state.selectedNaicsCodes) ? (
          <div>{this.renderNaicsList()}</div>
        ) : (
          <div>
            {this.getResults()}

            <div className={styles.loading}>
              <p>...now analyzing your business...</p>
            </div>
          </div>
        )}

        {!isEmpty(this.state.selectedNaicsCodes) && isEligibleForContractingPrograms && (
          <div>
            <p>
              You may be eligible to participate in{' '}
              <a href="/contracting" target="_blank" tabIndex="0">
                <strong>SBA contracting programs</strong>
              </a>
              .
            </p>
          </div>
        )}

        <div className={styles.cards}>
          <div className={styles.card}>
            <p>
              Learn more about{' '}
              <a
                href="/contracting/getting-started-contractor/make-sure-you-meet-sba-size-standards"
                target="_blank"
              >
                SBA small business size standards
              </a>
              .
            </p>
            <p>
              <strong>SBA Office of Size Standards</strong>
            </p>
            <ul>
              <li>
                <i className="fa fa-map-marker" aria-hidden="true" />
                <p>
                  409 3rd Street
                  <span className={styles.comma}>,</span> SW <br />
                  Washington
                  <span className={styles.comma}>,</span> DC 20416
                </p>
              </li>
              <li>
                <i className="fa fa-phone" aria-hidden="true" />
                <p>202-205-6618</p>
              </li>
              <li>
                <i className="fa fa-envelope" aria-hidden="true" />
                <p>
                  <a href="mailto:sizestandards@sba.gov">sizestandards@sba.gov</a>
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <p>
              Find out{' '}
              <a href="/contracting" target="_blank">
                how you can sell to the Federal Government
              </a>
              .
            </p>
            <p>
              <strong>SBA Office of Contracting</strong>
            </p>
            <ul>
              <li>
                <i className="fa fa-map-marker" aria-hidden="true" />
                <p>
                  409 3rd Street
                  <span className={styles.comma}>,</span> SW <br />
                  Washington
                  <span className={styles.comma}>,</span> DC 20416
                </p>
              </li>
              <li>
                <i className="fa fa-phone" aria-hidden="true" />
                <p>202-205-6621</p>
              </li>
              <li>
                <i className="fa fa-envelope" aria-hidden="true" />
                <p>
                  <a href="mailto:contracting@sba.gov">contracting@sba.gov</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

// mock data

SizeStandardsTool.defaultProps = {
  naicsCodes: [
    {
      id: '111130',
      description: 'Dry Pea and Bean Farming',
      sectorId: '11',
      sectorDescription: 'Agriculture, Forestry, Fishing and Hunting',
      subsectorId: '111',
      subsectorDescription: 'Crop Production',
      revenueLimit: null,
      employeeCountLimit: 100,
      footnote: null,
      parent: null
    },
    {
      id: '541715_a_Except',
      description: 'Aircraft, Aircraft Engine and Engine Parts11',
      sectorId: '54',
      sectorDescription: 'Professional, Scientific and Technical Services',
      subsectorId: '541',
      subsectorDescription: 'Professional, Scientific and Technical Services',
      revenueLimit: null,
      employeeCountLimit: 1500,
      footnote: 'NAICS Codes 541713, 541714 and 541715',
      parent: '111110'
    }
  ],
  disabledNaicsCodes: ['324110', '541519', '562910'] // specified by stakeholder
}

export { formatRevenueLimit, formatEmployeeCountLimit }
export { SizeStandardsTool, StartScreen, NaicsScreen, RevenueScreen, EmployeesScreen, ResultsScreen }
export default SizeStandardsTool
