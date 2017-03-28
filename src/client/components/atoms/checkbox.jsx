import React from 'react';
import Checkbox from './checkbox-lib.jsx';
import './checkbox.scss';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  handleFocus() {
    this.setState({
      focus: true
    })
  }

  handleBlur() {
    this.setState({
      focus: false
    })
  }

  render() {
    return (
      <div className={ this.state.focus ? "rc-checkbox-container-focused" : "rc-checkbox-container" }>
        <label className="rc-checkbox-label">
          <Checkbox name={ this.props.name } checked={ this.props.checked } onChange={ this.props.handleChange } onFocus={ this.handleFocus.bind(this) } onBlur={ this.handleBlur.bind(this) } autoFocus={ this.props.autoFocus }
          />
          { this.props.label }
        </label>
      </div>
      );
  }
}

export default CheckBox;