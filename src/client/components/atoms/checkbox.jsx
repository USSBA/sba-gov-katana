import React from 'react';
import Checkbox from './checkbox-lib.jsx';
import './checkbox.scss';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxFocus: false
    };
  }

  handleCheckboxFocus(e) {
    console.log(e.target);
    console.log("FOCUSSS");
    this.setState({
      checkboxFocus: true
    })
  }

  handleCheckboxBlur(e) {
    console.log(e.target);
    console.log("BLURR");
    this.setState({
      checkboxFocus: false
    })
  }


  containerStyle() {
    if (this.state.checkboxFocus) {
      return "rc-checkbox-container-focused"
    } else if (this.props.checked) {
      return "rc-checkbox-container-checked"
    } else {
      return "rc-checkbox-container"
    }
  }

  render() {
    return (
      <div className={ this.containerStyle() }>
        <label className="rc-checkbox-label">
          <Checkbox name={ this.props.name } 
                    checked={ this.props.checked } 
                    onChange={ this.props.handleChange } 
                    onFocus={ (e) => {
                        this.handleCheckboxFocus(e)}} 
                    onBlur={ (e) => {
                        this.handleCheckboxBlur(e)}} 
                    autoFocus={ this.props.autoFocus }
          />
          { this.props.label }
        </label>
      </div>
      );
  }
}

export default CheckBox;