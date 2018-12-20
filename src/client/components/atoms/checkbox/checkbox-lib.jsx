import React, { PropTypes } from 'react'
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

  /* eslint-disable no-invalid-this */
  handleChange = e => {
    const { disabled, onChange } = this.props

    if (disabled) {
      return
    }

    if (!('checked' in this.props)) {
      this.setState({
        checked: e.target.checked
      })
    }

    onChange({
      target: {
        ...this.props,
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
  /* eslint-enable no-invalid-this */

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
      autoFocus
    } = this.props
    const { checked } = this.state
    const disabledClass = disabled ? styles['rc-checkbox-disabled'] : ' '
    const checkedClass = checked ? styles['rc-checkbox-checked'] : ' '

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
          tabIndex={tabIndex}
          className={styles['rc-checkbox-input']}
          checked={Boolean(checked)}
          onClick={e => {
            this.handleCheckboxClick(e)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={this.handleChange}
          role="checkbox"
          aria-checked={checked}
        />
        <span className={styles['rc-checkbox-inner']} />
      </span>
    )
  }
}
