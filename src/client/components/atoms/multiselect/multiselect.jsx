import React from 'react'
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
        <label className={labelStyle ? labelStyle : null} htmlFor={id} tabIndex="0" aria-label={label}>
          {label}
        </label>
        <ReactSelect
          ref={input => (this.select = input)}
          className={classNames({
            [reactSelectClassName]: this.props?.reactSelectClassName,
            [styles.invalid]: validationState === 'error',
            [styles.alternateError]: alternateError
          })}
          menuBuffer={10}
          tabSelectsValue={false}
          autoBlur={true}
          value={this.state.value}
          arrowRenderer={() => <i className="fa fa-chevron-down" alt="drop-down arrow" />}
          clearRenderer={() => <span />}
          searchable={this.props.searchable}
          placeholder={!placeholder && langCode ? TRANSLATIONS.select[langCode].text : placeholder}
          aria-label={helperText}
          inputProps={['aria-label', 'aria-labelledby', 'required']
            .filter(attr => this.props?.[attr])
            // eslint-disable-next-line no-param-reassign
            .reduce((acc, attr) => (acc[attr] = this.props[attr]), {})}
          {...rest}
        />
        {helperText && validationState !== 'error' && <p className={styles.helperText}>{helperText}</p>}
        {validationState === 'error' && (
          <FormErrorMessage errorText={errorText} alternate={alternateError} />
        )}
      </div>
    )
  }
}

MultiSelect.defaultProps = {
  searchable: true
}
export default MultiSelect
