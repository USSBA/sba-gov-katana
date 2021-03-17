import React from 'react'
import ReactDOM from 'react-dom'
import ReactSelect from 'react-select-v1'
import classNames from 'classnames'
import 'react-select-v1/dist/react-select.css'

import styles from './multiselect.scss'
import { FormErrorMessage } from 'atoms'
import { getLanguageOverride } from '../../../services/utils.js'
import { TRANSLATIONS } from '../../../translations.js'

class MultiSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (this.select) {
      // TODO: This works but breaks tests due to react-dom and requires going
      // down a rabbit hole to fix them.
      // const combobox = ReactDOM.findDOMNode(this.select).querySelector('.Select-input')
      //
      // if (this.props.disabled) {
      //   // Manipulate the attributes that get added on to react-select's custom
      //   // input so that a screen reader properly reads the component (when
      //   // disabled) as disabled.
      //   combobox.removeAttribute('aria-activedescendant')
      //   combobox.setAttribute('aria-disabled', true)
      // } else {
      //   // Fix an issue where the user can type text in the hidden input inside
      //   // react-select's dropdown when the dropdown is focused.
      //   const input = combobox.querySelector('input')
      //   input.setAttribute('aria-readonly', true)
      //   input.setAttribute('readonly', true)
      // }
    }
  }

  render() {
    const {
      className,
      dataCy,
      helperText,
      errorText,
      id,
      label,
      placeholder,
      validationState,
      reactSelectClassName,
      labelStyle,
      alternateError,
      ...rest
    } = this.props

    const selectClassName = classNames({
      select: true,
      [styles.select]: true,
      [styles.error]: validationState === 'error',
      [className]: this.props?.className
    })

    const langCode = getLanguageOverride()
    const testId = dataCy ? dataCy : id

    return (
      <div className={selectClassName} data-cy={dataCy ? dataCy : id} data-testid={testId}>
        <label
          className={labelStyle ? labelStyle : null}
          htmlFor={id}
          tabIndex="0"
          aria-label={label}
        >
          {label}
        </label>
        <ReactSelect
          ref={input => (this.select = input)}
          className={classNames({            
            [reactSelectClassName]: this.props?.reactSelectClassName,
            [styles.invalid]: validationState === 'error',
            [styles.alternateError]: alternateError,
          })}
          menuBuffer={10}
          tabSelectsValue={false}
          autoBlur={true}
          value={this.state.value}
          arrowRenderer={() => <i className="fa fa-chevron-down" alt="drop-down arrow" />}
          clearRenderer={() => <span />}
          searchable={true}
          placeholder={!placeholder && langCode ? TRANSLATIONS.select[langCode].text : placeholder}
          inputProps={['aria-label', 'aria-labelledby', 'required']
            .filter(attr => this.props?.[attr])
            // eslint-disable-next-line no-param-reassign
            .reduce((acc, attr) => (acc[attr] = this.props[attr]), {})}
          {...rest}
        />
        {(helperText && validationState !== 'error') && (
          <p className={styles.helperText} tabIndex="0" aria-label={helperText}>
            {helperText}
          </p>
        )}
        {validationState === 'error' && <FormErrorMessage errorText={errorText} alternate />}
      </div>
    )
  }
}

export default MultiSelect
