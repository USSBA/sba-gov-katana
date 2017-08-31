import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  ContactCardLookup,
  SbicLookup,
  DocumentLookup,
  SuretyLookup
} from "molecules";
import * as ContentActions from "../../../actions/content.js";
import {filter} from "lodash";
import {logEvent} from "../../../services/analytics.js";

import styles from "./lookup.scss";

class Lookup extends React.Component {

  constructor() {
    super();
    this.state = {
      filteredItems: []
    }
  }

  componentWillMount() {
      if(this.props.type !== "documents"){
          let queryArgs = this.props.subtype
          ? {
              category: this.props.subtype
          }
          : null;
          this.props.actions.fetchContentIfNeeded(this.props.type, this.props.type, queryArgs);
      }
  }

  componentWillReceiveProps(nextProps, ownProps) {
    this.setState({filteredItems: nextProps.items});
  }

  fireEvent(category, action, value) {
    logEvent({category: category, action: action, label: window.location.pathname, value: value})
  }

  render() {

    let SelectedLookup = <div/>
    let _props = {
      items: this.state.filteredItems,
      title: this.props.title,
      afterChange: this.fireEvent.bind(this)
    }

    if (this.props.type === "contacts") {

      switch (this.props.subtype) {
        case "CDC/504 lender":
        case "State registration":
          SelectedLookup = <ContactCardLookup {..._props}/>

          break;

        case "SBIC":

          SelectedLookup = <SbicLookup {..._props}/>

          break;

        case "Surety bond agency":

          SelectedLookup = <SuretyLookup {..._props}/>

          break;

      }

    } else if (this.props.type === "documents") {

      SelectedLookup = <DocumentLookup {..._props}/>

    }

    return (

      <div>
        {SelectedLookup}
      </div>

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
  subtype: "",
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
