import React from 'react'
import { MultiSelect } from 'atoms'
import { camelCase, startCase } from 'lodash'
import PropTypes from 'prop-types'
import styles from './toggle.scss'

class Toggle extends React.Component {
  constructor(props) {
    super()
  }
  handleClick(option, index) {
    this.setState({ selectedOptionIndex: index })
    if (index !== this.getSelectedOptionIndex() && this.props.onChange) {
      this.props.onChange(option.value)
    }
  }
  getSelectedOptionIndex() {
    if (this.state && this.state.selectedOptionIndex) {
      return this.state.selectedOptionIndex
    } else {
      return this.props.defaultIndex
    }
  }
  renderOptions() {
    return this.props.options.map((option, index) => {
      return (
        <li key={`${this.props.id}-toggle-option-${index}`}>
          {this.getSelectedOptionIndex() === index ? (
            <span className={styles.selected}> {option.name}</span>
          ) : (
            <a
              onClick={event => {
                this.handleClick(option, index)
              }}
            >
              {' '}
              {option.name}
            </a>
          )}
        </li>
      )
    })
  }

  render() {
    return (
      <div className={styles.toggle}>
        <ul id={`${this.props.id}-toggle-list`}>{this.renderOptions()}</ul>
      </div>
    )
  }
}

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  //onClick: PropTypes.func,
  options: PropTypes.array.isRequired,
  defaultIndex: PropTypes.number
}

Toggle.defaultProps = {
  options: [],
  defaultIndex: 0
}

export default Toggle
