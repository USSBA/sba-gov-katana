import React from "react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../../actions/content.js"
import {filter} from "lodash"
import {logEvent} from "../../../services/analytics.js";

import styles from "./lookup.scss";
import ContactCardLookup from "../contact-card-lookup/contact-card-lookup.jsx"
import SbicLookup from "../sbic-lookup/sbic-lookup.jsx";
import DocumentLookup from "../document-lookup/document-lookup.jsx"
import SuretyLookup from "../surety-lookup/surety-lookup.jsx";

class Lookup extends React.Component {

  constructor() {
    super();
    this.state = {
      filteredItems: []
    }
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("contacts", this.props.type, {category: this.props.subtype});
  }

  componentWillReceiveProps(nextProps, ownProps){
      this.setState({filteredItems: nextProps.items});
  }

  fireEvent(category, action, value){
      logEvent({
          category: category,
          action: action,
          label: window.location.pathname,
          value: value
      })
  }


  render() {
    if (this.props.type === "contacts" && this.props.subtype === "State registration") {
        return (<ContactCardLookup items={this.state.filteredItems} title={this.props.title} afterChange={this.fireEvent.bind(this)}/>);
    } else if(this.props.type === "contacts" && this.props.subtype === "SBIC"){
        return (<SbicLookup items={this.state.filteredItems} title={this.props.title} afterChange={this.fireEvent.bind(this)}/>);
    } else if(this.props.type === "contacts" && this.props.subtype === "SBIC"){
        return (<SbicLookup items={this.state.filteredItems}   title={this.props.title} afterChange={this.fireEvent.bind(this)}/>);
    } else if(this.props.type === "contacts" && this.props.subtype === "Surety bond agency"){
      return(<SuretyLookup items={this.state.filteredItems}   title={this.props.title}/>);
    } else if(this.props.type === "document") {
      return <DocumentLookup title={'Document Stuff'} />
    } else {
    return <div></div>
    }
  }
}

Lookup.propTypes = {
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  display: React.PropTypes.string
}

Lookup.defaultProps = {
  title: "Lookup Title",
  type: "contacts",
  subtype: "State registration",
  display: "cards",
  items: []
}



function mapReduxStateToProps(reduxState, ownProps) {
  return {
    items: reduxState.contentReducer[ownProps.type]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Lookup);
