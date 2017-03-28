import React from 'react';
import Checkbox from './checkbox-lib.jsx';
import './checkbox.scss';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxFocus: false,
      labelFocus: false
    };
  }

  handleCheckboxFocus() {
  this.setState({
    checkboxFocus: true
  })
}

  handleCheckboxBlur() {
    this.setState({
      checkboxFocus: false
    })
  }


  containerStyle() {
    if (this.state.checkboxFocus) {
      console.log("focused");
      return "rc-checkbox-container-focused"
    } else if (this.props.checked) {
      console.log("checked");
      return "rc-checkbox-container-checked"
    } else {
      console.log("normal");
      return "rc-checkbox-container"
    }
  }

  render() {
    return (
      <div onClick={ this.handleCheckboxFocus.bind(this) } onBlur={ this.handleCheckboxBlur.bind(this) } className={ this.containerStyle() }>
        <label className="rc-checkbox-label">
          <Checkbox name={ this.props.name }
                    checked={ this.props.checked }
                    onChange={ this.props.handleChange }
                    onFocus={this.handleCheckboxFocus.bind(this)}
                    onBlur={this.handleCheckboxBlur.bind(this)}
                    autoFocus={ this.props.autoFocus }
          />
          { this.props.label }
        </label>
      </div>
      );
  }
}

export default CheckBox;