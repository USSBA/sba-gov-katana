import React from "react"
import s from "./surety-lookup.scss";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../../actions/content.js"
import {Multiselect} from '../../atoms';
import _ from 'lodash';
import Paginator from "../../molecules/paginator/paginator.jsx";

var pageSize = 9;
var dataProp = "statesTaxonomy";
class SuretyLookup extends React.Component {

  constructor(ownProps) {
    super();
    this.state = {
      filteredContacts: _.sortBy(ownProps.items, 'title') || [],
      suretyState: null,
      pageNumber: 1,
      numberOfTimesUserHasSelectedAState: 0
    }
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded(dataProp, "taxonomyVocabulary", {names: "state"});
  }

  componentWillReceiveProps(nextProps, ownProps) {
    this.setState({
      filteredContacts: _.sortBy(nextProps.items, 'title')
    });
  }

  handleSelect(e) {
    let newValue = e.value;
    this.setState({
      suretyState: e.value,
      numberOfTimesUserHasSelectedAState: this.state.numberOfTimesUserHasSelectedAState + 1,
      pageNumber: 1
    }, () => {
      this.filterContacts()
      if (this.props.afterChange) {
        this.props.afterChange("surety-lookup", newValue, this.state.numberOfTimesUserHasSelectedAState);
      }
    })
  }

  filterContacts() {
    let filteredContacts = _.filter(this.props.items, (agency) => {
      return !_.isEmpty(_.intersection(_.castArray(agency.stateServed), _.castArray(this.state.suretyState)))
    })
    this.setState({filteredContacts: filteredContacts})
  }

  multiSelectProps() {
    let options = this.props.states.terms.map((state) => {
      return {label: state, value: state}
    })
    options.push({label: "", value: null})
    return {id: "surety-state-select", label: "Show surety agencies licensed in", name: "surety-state-select", options: options}
  }

  handleBack() {
    this.setState({
      pageNumber: Math.max(1, this.state.pageNumber - 1)
    })
  }

  handleForward() {
    this.setState({
      pageNumber: Math.min(Math.ceil(this.state.filteredContacts.length / pageSize), this.state.pageNumber + 1)
    })
  }

  renderCards() {
    let start = ((this.state.pageNumber - 1) * pageSize);
    let slice = this.state.filteredContacts.slice(start, start + pageSize)
    return slice.map((agency, index) => {
      return (
        <div id={'surety-card' + index} key={index} className={s.card}>
          <h4 className={s.title}>{agency.title}</h4>
          <div className={s.phoneContainer}>
            <i className={s.phoneIcon + " fa fa-phone"} aria-hidden="true"></i>
            <span>{agency.phoneNumber}</span>
          </div>
          <div>
            <i className={s.emailIcon + " fa fa-envelope-o"} aria-hidden="true"></i>
            <a href={"mailto:" + agency.email + "?subject=The subject for the email"}>Email</a>
          </div>
        </div>
      )
    })
  }

  renderCardContainer() {
    if (!_.isEmpty(this.state.filteredContacts)) {
      return this.renderCards()
    } else if (_.isEmpty(this.state.filteredContacts)) {
      return <EmptyContacts/>
    } else {
      return "Loading"
    }
  }

  render() {
    return (
      <div id={'surety-lookup'}>
        <div className={s.banner}>
          <h2>Contact a surety bond agency</h2>
          <p className={s.blurb}>Check the database of surety agencies that offer SBA-guranteed bonds. Contact a surety agency in your state to get started with the application process.</p>
          <div className={s.multiSelect}>
            <Multiselect {...this.multiSelectProps()} onChange={(e) => this.handleSelect(e)} value={this.state.suretyState} onBlur={() => {
              return null
            }} onFocus={() => {
              return null
            }} validationState="" errorText="" autoFocus={false} multi={false}/>
          </div>
        </div>

        <div className={s.cardContainer}>
          {this.renderCardContainer()}
        </div>
        <div className={s.paginator}>
          <Paginator pageNumber={this.state.pageNumber} pageSize={pageSize} total={this.state.filteredContacts.length} onBack={this.handleBack.bind(this)} onForward={this.handleForward.bind(this)}/>
        </div>
      </div>
    )
  }
}

const EmptyContacts = () => <div className={s.emptyContacts}>
  <div>No surety agencies found</div>
</div>

SuretyLookup.defaultProps = {
  states: {
    name: "state",
    terms: []
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  if (reduxState.contentReducer[dataProp]) {
    return {states: reduxState.contentReducer[dataProp][0]
    };

  } else {
    return {};
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(SuretyLookup);
