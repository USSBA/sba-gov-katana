import React from "react"
import s from "./surety-lookup.scss";
import SmallInverseSecondaryButton from '../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx';
import MultiSelect from "../../atoms/multiselect/multiselect.jsx";
import madison from 'madison';
import _ from 'lodash';

class SuretyLookup extends React.Component {

  constructor(ownProps) {
    super();
    this.state = {
      filteredContacts: ownProps.items,
      suretyState: null
    }
  }

  componentWillReceiveProps(nextProps, ownProps) {
    this.setState({
      filteredContacts: nextProps.items
    });
  }

  handleSelect(e){
    this.setState({suretyState: e.value}, () => {
      this.filterContacts()
    })
  }

  filterContacts() {
    let filteredContacts = _.filter(this.props.items, (agency) => {
      return !_.isEmpty(_.intersection(_.castArray(agency.stateServed), _.castArray(this.state.suretyState)))
    })
    this.setState({filteredContacts: filteredContacts})
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
    return this.state.filteredContacts.map((agency, index) => {
      return (
      <div id={'surety-card' + index} key={index} className={s.card}>
        <h4 className={s.title}>{agency.title}</h4>
        <div className={s.phoneContainer}>
          <i className={s.phoneIcon + " fa fa-phone"} aria-hidden="true"></i>
          <span>{agency.phoneNumber}</span>
        </div>
        <div>
          <i className={s.emailIcon + " fa fa-envelope-o"} aria-hidden="true"></i>
          <a href={"mailto:"+agency.email+"?subject=The subject for the email"}>{agency.email}</a>
        </div>
      </div>
      )
    })
  }

  renderCardContainer(){
    if(!_.isEmpty(this.state.filteredContacts)) {
      return this.renderCards()
    } else if (_.isEmpty(this.state.filteredContacts)){
      return <EmptyContacts />
    } else {
      return "Loading"
    }
  }

  render() {
    return(
      <div id={'surety-lookup'}>
        <div className={s.banner}>
          <h2>Contact a surety bond agency</h2>
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
          {this.renderCardContainer()}
        </div>
      </div>
    )
  }
}

const EmptyContacts = () => 
  <div className={s.emptyContacts}>
    <div>No surety agencies found</div>
  </div>

export default SuretyLookup;
