import React from "react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestContentActions from "../../../actions/rest-content.js"
import {filter} from "lodash"

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
    this.props.actions.fetchContentIfNeeded(this.props.type);
  }

  componentWillReceiveProps(nextProps, ownProps){
      this.setState({filteredItems: this.filterItems(nextProps.items, nextProps.subtype)});
  }

  filterItems(items, subtype) {
    let filteredItems = filter(items, function(item) {
        if(item.categoryTaxonomyTerm && item.categoryTaxonomyTerm.name){
            return  item.categoryTaxonomyTerm.name === subtype;
        }else{
            return false;
        }
    });
    return filteredItems;
  }

  render() {
    if (this.props.type === "contacts") {
      if (this.props.subtype === "State registration") {
        return (<ContactCardLookup items={this.state.filteredItems} title={this.props.title}/>);
      }
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
    items: reduxState.restContent[ownProps.type]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Lookup);
