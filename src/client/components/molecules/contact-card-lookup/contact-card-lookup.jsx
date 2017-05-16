import React from "react"
import styles from "./contact-card-lookup.scss";
import states from "../../../services/us-states.json";
import MultiSelect from "../../atoms/multiselect/multiselect.jsx";

class ContactCardLookup extends React.Component {

  constructor() {
    super();
    this.state = {
      displayedItems: [],
      noContacts: false,
      value: null
    }
  }

  handleChange(selectValue) {
    let newDisplayedItems = _.filter(this.props.items, {stateServed: selectValue.label});
    this.setState({
      value: selectValue.value,
      displayedItems: newDisplayedItems
    }, () => {
      this.state.displayedItems.length < 1
        ? this.setState({noContacts: true})
        : this.setState({noContacts: false})
    });
  }

  handleFocus() {}

  handleBlur() {}

  render() {
    let statesMap = _.map(states, function(item) {
      return {label: item.name, value: item.value}
    });
    let multiselectProps = {
      id: "lookup-select",
      errorText: "Please select a state",
      label: "",
      name: "state-lookup",
      onChange: this.handleChange.bind(this),
      validationState: "",
      value: this.state.value,
      options: statesMap,
      onBlur: this.handleBlur.bind(this),
      autoFocus: true,
      multi: false,
      onFocus: this.handleFocus.bind(this)
    };
    return (
      <div>
        <div className={styles.container}>
          <h4 className={styles.title}>{this.props.title || "Look up your state"}</h4>
          <div key={1} className={styles.selectContainer}>
            <MultiSelect {...multiselectProps}></MultiSelect>
          </div>
          <div key={2} className={styles.dataContainer}>{this.state.displayedItems.map(function(item, index) {
              return (
                <div id={"card-" + index} className={styles.card}>
                  {item.link
                    ? <a className={styles.itemLink} href={item.link}>{item.title}
                        <i className="fa fa-external-link-square" aria-hidden="true"></i>
                      </a>
                    : null}
                  {item.streetAddress
                    ? <div className={styles.itemData}>{item.streetAddress}</div>
                    : null}
                  {item.city && item.state && item.zipCode
                    ? <div className={styles.itemData}>{item.city}, {item.state}
                        {item.zipCode}</div>
                    : null}
                </div>
              );
            })}</div>

          {this.state.noContacts
            ? <div className={styles.noContacts}>No contacts found for this State</div>
            : null}

        </div>
      </div>
    )
  }
}

ContactCardLookup.propTypes = {
  title: React.PropTypes.string,
  items: React.PropTypes.array
}

ContactCardLookup.defaultProps = {
  title: "Lookup Title",
  items: []
}
export default ContactCardLookup;
