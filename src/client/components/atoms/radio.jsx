import React from 'react';
import styles from './radio.scss';
import _ from "lodash";
import formHelperStyles from "../helpers/form-helpers.scss";
import FormErrorMessage from "./form-error-message.jsx";
/* esfmt-ignore-start */
class RadioButtonGroup extends React.Component {
  constructor(props) {
    super();
  }
  fireChange(index) {
    this.props.onChange(this.props.options[index].value);
  }
  handleChange() {}
  handleClick(index, me) {
    me.fireChange(index);
  }
  handleKeyPress(event, index, me) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code == 32) {
      me.fireChange(index);
      event.preventDefault();
    }
  }
  handleBlur(index) {
    let isLast = (index === (this.props.options.length - 1));
    if (isLast) {
      this.props.onBlur();
    }
  }
  render() {
    let me = this;
    let radioButtons = this.props.options.map(function(item, index) {
      let id = "radio" + index;
      let isChecked = item.value === me.props.value;

      return <div className={styles.radioItem + " " + (isChecked
        ? styles.radioItemSelected
        : styles.radioItemNotSelected)} onClick={(event) => me.handleClick(index, me)} key={index} tabIndex="0" onKeyPress={(event) => me.handleKeyPress(event, index, me)} onBlur={(e) => me.handleBlur(index)}>
        <input className={styles.regularRadio} type="radio" name={me.props.name} checked={isChecked} tabIndex="0" onChange={me.handleChange} id={id} value={item.value}></input>
        <label className={styles.myLabel} htmlFor={id}/>
        <span className={styles.radioText}>{item.text}</span>
      </div>;
    });

    let errorMessage = this.props.validationState == 'error'
      ? <FormErrorMessage errorText={this.props.errorText} />
      : undefined;

    return (
      <div>
        <label className={formHelperStyles.controlLabel}>
          {this.props.label}
        </label>
        <div>
          {radioButtons}
        </div>
        {errorMessage}
      </div>
    );
  }
}
/* esfmt-ignore-end */
/* options is array of name/value/text triples */
RadioButtonGroup.propTypes = {
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
};

export default RadioButtonGroup;
