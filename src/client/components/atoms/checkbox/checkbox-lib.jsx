import React, { PropTypes } from 'react';
//import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import classNames from 'classnames';

export default class Checkbox extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
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
  };
  static defaultProps = {
    prefixCls: 'rc-checkbox',
    className: '',
    style: {},
    type: 'checkbox',
    defaultChecked: false,
    onFocus() {},
    onBlur() {},
    onChange() {},
  };
  constructor(props) {
    super(props);

    const checked = 'checked' in props ? props.checked : props.defaultChecked;

    this.state = {
      checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  // shouldComponentUpdate(...args) {
  //   return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  // }

  handleChange = (e) => {
    const {props} = this;
    if (props.disabled) {
      return;
    }
    if (!('checked' in props)) {
      this.setState({
        checked: e.target.checked,
      });
    }
    props.onChange({
      target: {
        ...props,
        checked: e.target.checked,
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      },
    });
  };

  handleCheckboxClick(e) {
    this.checkBox.focus();
  }

/*esfmt-ignore-start*/
  render() {
    const {id, prefixCls, className, style, name, type, disabled, readOnly, tabIndex, onClick, onFocus, onBlur, autoFocus} = this.props;
    const {checked} = this.state;
    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
    });

    return (
      <span className={ classString } style={ style }>
        <input
            id={id}
            name={ name }
            ref={(input) => {this.checkBox = input;}}
            autoFocus={ autoFocus }
            type={ type }
            readOnly={ readOnly }
            disabled={ disabled }
            tabIndex={ tabIndex }
            className={ `${prefixCls}-input` }
            checked={ !!checked }
            onClick={ (e) => {this.handleCheckboxClick(e)} }
            onFocus={ onFocus }
            onBlur={ onBlur }
            onChange={ this.handleChange }
            />
        <span className={ `${prefixCls}-inner` } />
      </span>
      );
  }
  /*esfmt-ignore-end*/
}
