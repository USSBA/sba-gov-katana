import React from "react"
import s from "./surety-lookup.scss";
import SmallInverseSecondaryButton from '../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx';
import MultiSelect from "../../atoms/multiselect/multiselect.jsx";
import madison from 'madison';

class SuretyLookup extends React.Component {

  constructor(ownProps) {
    super();
    this.state = {
      filteredItems: ownProps.items,
      suretyState: null
    }
  }

  componentWillReceiveProps(nextProps, ownProps) {
    this.setState({
      filteredItems: nextProps.items
    }, () => {
      console.log(this.state.filteredItems)
    });
  }

  handleSelect(e){
    this.setState({suretyState: e.value})
  }

  multiSelectProps() {
    let options = madison.states.map((state) => {
      return {
        label: state.name,
        value: state.name
      }
    })
    return {
      id: "surety-state-select",
      label: "Show surety agencies licensed in",
      name: "surety-state-select",
      options: options
    }
  }

  renderCards(){
    return this.state.filteredItems.map((agency) => {
      return (
      <div className={s.card}>
        {agency.title}
      </div>
      )
    })
  }

  render() {
    return(
      <div>
        <div className={s.banner}>
          <h2>Contact a surety bong agency</h2>
          <p className={s.blurb}>Check the database of surety agencies that offer SBA-guranteed bonds. Contact a surety agency in your state to get started with the application process.</p>
          <div className={s.multiSelect}>
            <MultiSelect 
              {...this.multiSelectProps()} 
              onChange={(e) => this.handleSelect(e)}
              value={this.state.suretyState}
              onBlur={() => {return null}}
              onFocus={() => {return null}}
              validationState=""
              errorText="" 
              autoFocus={false}
              multi={false}
            />
          </div>
        </div>

        <div className={s.cardContainer}>
          {this.state.filteredItems ? this.renderCards() : <div>Loading</div>}
        </div>
      </div>
    )
  }
}

export default SuretyLookup;
