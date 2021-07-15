import React from 'react'
import PropTypes from 'prop-types'
import styles from './checkbox.scss'

export default class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.string,
    defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    disabled: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    tabIndex: PropTypes.string,
    readOnly: PropTypes.bool,
    autoFocus: PropTypes.bool
  }
  static defaultProps = {
    tabIndex: '0',
    className: '',
    style: {},
    type: 'checkbox',
    defaultChecked: false,
    onFocus() {},
    onBlur() {},
    onChange() {}
  }
  constructor(props) {
    super(props)

    const checked = 'checked' in props ? props.checked : props.defaultChecked

    this.state = {
      checked
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked
      })
    }
  }

  handleChange = e => {
    /* eslint-disable-next-line no-invalid-this */
    const { props } = this
    if (props.disabled) {
      return
    }
    if (!('checked' in props)) {
      /* eslint-disable-next-line no-invalid-this */
      this.setState({
        checked: e.target.checked
      })
    }
    props.onChange({
      target: {
        ...props,
        checked: e.target.checked
      },
      stopPropagation() {
        e.stopPropagation()
      },
      preventDefault() {
        e.preventDefault()
      }
    })
  }

  handleCheckboxClick(e) {
    this.checkBox.focus()
  }

  render() {
    const {
      id,
      className,
      style,
      name,
      type,
      disabled,
      readOnly,
      tabIndex,
      onClick,
      onFocus,
      onBlur,
      autoFocus,
      ariaLabel,
      alternate
    } = this.props
    const { checked } = this.state
    const disabledClass = disabled ? styles['rc-checkbox-disabled'] : ' '
    const checkedClass = checked ? styles['rc-checkbox-checked'] : ' '

    const returnAlternateCheckboxStyles = () => {
      if (alternate && checked) {
        return styles['alternate-hover'] + ' ' + styles['alternate-checked']
      }
    }

    return (
      <span className={styles['rc-checkbox'] + ' ' + disabledClass + ' ' + checkedClass} style={style}>
        <input
          id={id}
          name={name}
          ref={input => {
            this.checkBox = input
          }}
          autoFocus={autoFocus}
          type={type}
          readOnly={readOnly}
          disabled={disabled}
          tabIndex="-1"
          className={styles['rc-checkbox-input']}
          checked={Boolean(checked)}
          onClick={e => {
            this.handleCheckboxClick(e)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={this.handleChange}
          aria-hidden={true}
        />
        <span
          className={styles['rc-checkbox-inner'] + ' ' + returnAlternateCheckboxStyles()}
          aria-label={ariaLabel}
          aria-checked={checked}
          tabIndex={tabIndex}
          role="checkbox"
          onKeyDown={this.props.onKeyDown}
        />
      </span>
    )
  }
}
