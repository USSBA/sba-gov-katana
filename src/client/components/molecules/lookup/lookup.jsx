import React from "react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../../actions/content.js"
import {filter} from "lodash"
import {logEvent} from "../../../services/analytics.js";

import styles from "./lookup.scss";
import ContactCardLookup from "../contact-card-lookup/contact-card-lookup.jsx"

class Lookup extends React.Component {

  constructor() {
    super();
    this.state = {
      filteredItems: []
    }
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("contacts", this.props.type);
  }

  componentWillReceiveProps(nextProps, ownProps){
      this.setState({filteredItems: this.filterItems(nextProps.items, nextProps.subtype)});
  }

  fireEvent(category, action, value){
      logEvent({
          category: category,
          action: action,
          label: window.location.pathname,
          value: value
      })
  }

  filterItems(items, subtype) {
    let filteredItems = filter(items, function(item) {
        if(item.category){
            return  item.category === subtype;
        }else{
            return false;
        }
    });
    return filteredItems;
  }

  render() {
    if (this.props.type === "contacts") {
        return (<ContactCardLookup items={this.state.filteredItems} title={this.props.title} afterChange={this.fireEvent.bind(this)}/>);
    }
    return (
      <div></div>
    )
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
