import React from "react"
import styles from "./contact-card-lookup.scss";
import states from "../../../services/us-states.json";
import SimpleSelect from "../../atoms/simple-select/simple-select.jsx";

class ContactCardLookup extends React.Component {

  constructor() {
    super();
    this.state = {
      displayedItems: [],
      noContacts: false
    }
  }

  handleChange(selectValue) {
    let stateName = _.find(states, {value: selectValue});
    //console.log("stateName", stateName);
    let newDisplayedItems = _.filter(this.props.items, {stateServed: stateName.name});
    this.setState({displayedItems: newDisplayedItems}, ()=>{
      this.state.displayedItems.length < 1 ? this.setState({noContacts: true}) : this.setState({noContacts: false})
    });
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <h4 className={styles.title}>{this.props.title || "Look up your state"}</h4>
          <div key={1} className={styles.selectContainer}>
            <SimpleSelect id="lookup-select" options={states} onChange={this.handleChange.bind(this)}/>
          </div>
          <div key={2} className={styles.dataContainer}>{this.state.displayedItems.map(function(item, index) {
              return (
                <div className={styles.card}>
                  { item.link ? <a className={styles.itemLink} href={item.link}>{item.title} <i className="fa fa-external-link-square" aria-hidden="true"></i></a> : null }
                  { item.streetAddress ? <div className={styles.itemData}>{item.streetAddress}</div> : null }
                  { item.city&&item.state&&item.zipCode ? <div className={styles.itemData}>{item.city}, {item.state} {item.zipCode}</div> : null }
                </div>
              );
            })}</div>

          { this.state.noContacts ? <div className={styles.noContacts}>No contacts found for this State</div> : null }

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
