import React from 'react';
import styles from './radio.scss';
import _ from "lodash";
import formHelperStyles from "../helpers/form-helpers.scss";

class RadioButtonGroup extends React.Component {
  handleClick(event) {
    this.props.onChange(event.target.value);
  }
  render() {
    let me = this;
    let radioButtons = this.props.options.map(function(item, index) {
      let id = "radio" + index;
      let radioInput = (
      <input className={ styles.regularRadio } type="radio" name={ me.props.name } checked={ item.value === me.props.value } onClick={ me.handleClick.bind(this) } id={ id } value={ item.value }></input>
      );
      let radioLabel = (
      <label clasName={ styles.myLabel } for={ id }>
        { item.text }
      </label>
      );
      return [radioInput, radioLabel];
    });
    return (
      <div className={ styles.container }>
        <label className={ formHelperStyles.controlLabel }>
          { this.props.label }
        </label>
        { radioButtons }
      </div>
      );
  }
}

/* options is array of name/value/text triples */
RadioButtonGroup.propTypes = {
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
};

export default RadioButtonGroup;
