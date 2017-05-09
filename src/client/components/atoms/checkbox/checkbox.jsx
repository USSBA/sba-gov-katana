import React from 'react';
import Checkbox from './checkbox-lib.jsx';
import './checkbox.scss';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    let checkboxContainer = null;
    this.state = {
      checkboxFocus: false,
      // containerWidth: 0,
      // windowWidth: window.innerWidth
    };
  }

  // handleResize(e) {
  //   this.setState({
  //   windowWidth: window.innerWidth,
  //   containerWidth: this.checkboxContainer.offsetWidth
  //   });
  // }

  // componentDidMount() {
  //   window.addEventListener('resize', ::this.handleResize)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', ::this.handleResize)
  // }

  handleCheckboxFocus(e) {
    this.setState({checkboxFocus: true})
  }

  handleCheckboxBlur(e) {
    this.setState({checkboxFocus: false})
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
      <div ref={(container) => {
        this.checkboxContainer = container
      }} className={this.containerStyle()}>
        <label className="rc-checkbox-label">
          <Checkbox name={this.props.name} checked={this.props.checked} onChange={this.props.handleChange} onFocus={(e) => {
            this.handleCheckboxFocus(e)
          }} onBlur={(e) => {
            this.handleCheckboxBlur(e)
          }} autoFocus={this.props.autoFocus}/> {this.props.label}
        </label>
      </div>
    );
  }
}

export default CheckBox;
