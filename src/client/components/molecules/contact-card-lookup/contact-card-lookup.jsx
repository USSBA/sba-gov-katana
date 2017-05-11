import React from "react"
import styles from "./contact-card-lookup.scss";
import states from "../../../services/us-states.json";
import SimpleSelect from "../../atoms/simple-select/simple-select.jsx";

class ContactCardLookup extends React.Component {

  constructor() {
    super();
    this.state = {
      displayedItems: []
    }
  }

  handleChange(selectValue) {
    console.log("handleChange", this.props);
    console.log("selectValue", selectValue);
    let stateName = _.find(states, {value: selectValue});
    console.log("stateName", stateName);
    let newDisplayedItems = _.filter(this.props.items, {stateServed: stateName.name});
    this.setState({displayedItems: newDisplayedItems});
  }

  render() {
    console.log("ContactCardLookup render", this.props);
    return (
      <div>
        <div className={styles.container}>
          <h4 className={styles.title}>{this.props.title || "Look up your state"}</h4>
          <div key={1} className={styles.selectContainer}>
            <SimpleSelect id="lookup-select" options={states} onChange={this.handleChange.bind(this)}/>
          </div>
          <div key={2} className={styles.dataContainer}>{this.state.displayedItems.map(function(item, index) {
              return (
                <p key={index}>
                  {JSON.stringify(item)}
                </p>
              );
            })}</div>
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
