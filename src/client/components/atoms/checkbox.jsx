import React from 'react';
import Checkbox from 'rc-checkbox';
import './checkbox.scss';

class CheckBox extends React.Component {

  render() {
    return (
      <div  className="rc-checkbox-container">
        <label className="rc-checkbox-label">
        <Checkbox/>
          here is the label
        </label>

      </div>


      );
  }
}

export default CheckBox;