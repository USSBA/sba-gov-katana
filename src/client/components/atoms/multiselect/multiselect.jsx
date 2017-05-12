import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
// import './react-select-helpers.css';
import FormErrorMessage from "../form-error-message/form-error-message.jsx";
import styles from './multiselect.scss';
import _ from "lodash";
import chevron from "../../../../../public/assets/svg/chevron.svg";
class MultiSelectBox extends React.Component {
  handleChange(newValue) {
    if (newValue.length <= this.props.maxValues) {
      this.props.onChange(_.map(newValue, 'value').join(","));
    }
  }
  handleBlur() {
    this.props.onBlur({
      target: {
        name: this.props.name
      }
    });
  }
  handleFocus() {
    this.props.onFocus({
      target: {
        name: this.props.name
      }
    });
  }

  renderArrow() {
    return (<i src={chevron}/>);
  }
  render() {

    let myValue = this.props.multi ? (this.props.value ?
      this.props.value.split(",") :
      []) : this.props.value;
    let errorMessage = this.props.validationState == 'error' ?
      <FormErrorMessage errorText={this.props.errorText} /> :
      undefined;
    let errorClass = this.props.validationState == 'error' ?
      styles.redBorder :
      "";
    //arrowRenderer={this.renderArrow}
    let clearRenderer = this.props.multi ? undefined : () => {
      return (<div/>);
    };
    return (
      <div>
        <label>
          {this.props.label}
        </label>
        <div className={styles.errorClass}>
          <ReactSelect className={errorClass + " " + styles.myselect } menuBuffer={10} tabSelectsValue={false} multi={this.props.multi} autoBlur={true} onChange={this.handleChange.bind(this)} name={this.props.name} require={this.props.required} autofocus={this.props.autoFocus} value={myValue} options={this.props.options} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}
              clearRenderer={clearRenderer} searchable={this.props.multi} />
        </div>
        {errorMessage}

      </div>
    );
  }
}

MultiSelectBox.defaultProps = {
  multi: true
}

export default MultiSelectBox;
