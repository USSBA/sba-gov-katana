import React from 'react';
import Checkbox from 'rc-checkbox';
import './checkbox.scss';

class CheckBox extends React.Component {

  render() {
    return (
      <div className="rc-checkbox-container">
        <label className="rc-checkbox-label">
          <Checkbox autofocus tabIndex={this.props.tabIndex} name={this.props.name} onChange={this.props.handleChange} checked={this.props.checked}/> {this.props.label}
        </label>
      </div>


      );
  }
}

export default CheckBox;