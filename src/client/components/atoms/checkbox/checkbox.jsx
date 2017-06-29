import React from 'react';
import Checkbox from './checkbox-lib.jsx';
import styles from './checkbox.scss';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxFocus: false,
    };
  }


  handleCheckboxFocus(e) {
    this.setState({checkboxFocus: true})
  }

  handleCheckboxBlur(e) {
    this.setState({checkboxFocus: false})
  }

  containerStyle() {
    if (this.state.checkboxFocus) {
      return styles["rc-checkbox-container-focused"]
    } else if (this.props.checked) {
      return styles["rc-checkbox-container-checked"]
    } else {
      return styles["rc-checkbox-container"]
    }
  }

  render() {
    return (
      <div className={this.containerStyle()}>
        <label htmlFor={this.props.id} className={styles["rc-checkbox-label"]}>
          <Checkbox id={this.props.id} name={this.props.name} checked={this.props.checked} onChange={this.props.handleChange} onFocus={(e) => {
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
